import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-kings-jodi',
  standalone: true,
  imports: [MatExpansionModule,MatDividerModule,MatProgressBarModule],
  templateUrl: './kings-jodi.component.html',
  styleUrl: './kings-jodi.component.scss',
})
export class KingsJodiComponent implements OnInit {
  kingResData: any;
  filteredData: any[] = [];
  getMeata: any;
  faqSchema: any;
  panelOpenState:boolean = false
  id: any;

  faqData:any
  bazarDetails:any
  pageDetails:any
  name: any;
  timeBreaks = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(
    private titleService: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private global: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((p) => {
      this.id = p.get('id');
    });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.global.getWithoutToken(`page-meta/${this.id}`).subscribe({
      next: (res: any) => {
        this.getMeata = res.data[0];
        //console.log(res)
        this.setMetaTags();
      },
      error: (err: any) => {
        //console.log(err)
      },
    });
    this.global.getWithoutToken(`king-jodi/${this.id}`).subscribe({
      next: (res: any) => {
        console.log(res)
        this.kingResData = res.data;
        console.log(this.kingResData);
        this.bazarDetails = res.bazar;
        this.pageDetails = res.pageDetails[0];
        this.name = this.bazarDetails.name
        this.faqData = res.faq

        this.filterDataByDate();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // set Meta
  setMetaTags(): void {
    //console.log(typeof(this.getMeata?.meta_faq_schema))
    this.titleService.setTitle(this.getMeata.meta_title);
    this.meta.updateTag({
      name: 'description',
      content: this.getMeata.meta_desc,
    });
    this.meta.updateTag({
      property: 'og:title',
      content: this.getMeata.meta_og_title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: this.getMeata.meta_og_desc,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: this.getMeata.meta_og_url,
    });
    if (this.getMeata.meta_index) {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    }

    this.faqSchema = this.sanitizer.bypassSecurityTrustHtml(
      this.getMeata.meta_faq_schema
    );
  }

  filterDataByDate() {
    for (let index = 0; index <= 31; index++) {
      // const formattedDate = this.formatDate(currentDate);
      if (index) {
        this.filteredData.push({
          date: index,
        });
      }
    }
    console.log(this.filteredData);
  }
  sortDataByIndex(data: any) {
    data.sort((a: any, b: any) => {
      return parseInt(a.date_index) - parseInt(b.date_index);
    });
  }

  getValueForDay(day: any, month: any) {
    console.log(day + ' ' + month);
  }

  formatDate(dayset: number, monthOffset: number) {
    // Get the current date
    const currentDate = new Date();
    const dayOffset = dayset - 1;
    // Define the starting date with the current year
    const startDate = new Date(currentDate.getFullYear(), 0, 1); // January 1 of the current year

    // Calculate the new date
    const newDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + monthOffset,
      startDate.getDate() + dayOffset
    );

    // Get the components of the new date
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    const fullDate = `${day}/${month}/${year}`;
    // Format the date as day/month/year
    const filterData = this.kingResData.filter((item: any) => {
      return fullDate == item.date;
    });
    let monthst = monthOffset + 1;
    if (fullDate == '30/04/2024') {
      console.log(filterData);
      console.log(monthst.toString() + ' ' + month);
    }
    if (fullDate == '31/04/2024') {
      console.log(filterData);

      console.log(monthst.toString() + ' ' + month);
    }
    return filterData.length > 0 ? filterData[0].jodi : '-';
  }
}
