import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-starlines-jodi',
  standalone: true,
  imports: [ MatExpansionModule,MatDividerModule,MatProgressBarModule],
  templateUrl: './starlines-jodi.component.html',
  styleUrl: './starlines-jodi.component.scss'
})
export class StarlinesJodiComponent implements OnInit {
  id: any;
  timeBreaks:any
  openTime:any
  closeTime:any
  pageDetails:any
  name:any
  faqSchema:any
  getMeata:any
  starlineResData: any[] = [];
  bazarDetails:any
  faqData:any
  filteredData: any[] = [];
  selectedInterval:any = "60"
  panelOpenState = false;

  constructor(private titleService:Title, private meta:Meta ,private sanitizer:DomSanitizer,private router: ActivatedRoute, private global: GlobalService,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.global.getWithoutToken(`page-meta/${this.id}`).subscribe({
      next:(res:any)=>{
        this.getMeata = res.data[0]
        //console.log(res)
        this.setMetaTags()
      },error: (err:any)=>{
        //console.log(err)
      }
    })

    // page details
    this.global.getWithoutToken(`starline-jodi/${this.id}`).subscribe({
      next: (res: any) => {
        //console.log(res);
        this.starlineResData = res.data;
        this.bazarDetails = res.bazar;
        this.pageDetails = res.pageDetails[0];
        this.name = this.bazarDetails.name
        this.faqData = res.faq
        // //console.log(parm)
        this.openTime = this.bazarDetails.open_time
        this.closeTime =this.bazarDetails.close_time
        this.filterDataByDate();
        this.generateTimeBreaks(this.openTime,this.closeTime)
      },
      error: (err) => {
        //console.log(err);
      }
    });
  }
  
  // set Meta
  setMetaTags(): void {
    //console.log(typeof(this.getMeata?.meta_faq_schema))
    this.titleService.setTitle(this.getMeata.meta_title);
    this.meta.updateTag({ name: 'description', content: this.getMeata.meta_desc });
    this.meta.updateTag({ property: 'og:title', content: this.getMeata.meta_og_title });
    this.meta.updateTag({ property: 'og:description', content: this.getMeata.meta_og_desc });
    this.meta.updateTag({ property: 'og:url', content: this.getMeata.meta_og_url });
    if(this.getMeata.meta_index){

      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }else{
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

    }

    this.faqSchema = this.sanitizer.bypassSecurityTrustHtml(this.getMeata.meta_faq_schema);
  }


  // getJodiData() {
  //   this.global.getWithoutToken(`starline-jodi/${this.id}`).subscribe({
  //     next: (res: any) => {
  //       //console.log(res);
  //       this.starlineResData = res.data;
  //       this.bazarDetails = res.bazar;
  //       // //console.log(parm)
  //       this.openTime = this.bazarDetails.open_time
  //       this.closeTime =this.bazarDetails.close_time
  //       this.filterDataByDate();
  //       this.generateTimeBreaks(this.openTime,this.closeTime)
  //     },
  //     error: (err) => {
  //       //console.log(err);
  //     }
  //   });
  // }

  generateTimeBreaks(openTime:any, closeTime:any) {
    this.timeBreaks = [];
    this.timeBreaks.push(openTime);
    let startTime = new Date('1970-01-01 ' + openTime); // Set date to ensure proper comparison
    startTime.setHours(startTime.getHours() + 1); // Add 1 hour to the open time
    const endTime = new Date('1970-01-01 ' + closeTime); // Set date to ensure proper comparison

    while (startTime <= endTime) {
      this.timeBreaks.push(this.formatTime(startTime));
      startTime = new Date(startTime.getTime() + this.selectedInterval * 60000); // Increment by selected interval in milliseconds
    }
    // console.log(this.timeBreaks)

  }
  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  filterDataByDate() {
    const today = new Date();
    for (let index = 0; index < 30; index++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - index);
      const formattedDate = this.formatDate(currentDate);
      const filteredItems = this.starlineResData.filter(item => item.date === formattedDate);
      
      if (filteredItems.length > 0) {
        this.filteredData.push({
          date: formattedDate,
          jodiData: filteredItems
        });
      }
    }
    console.log(this.filteredData);
  }
  sortDataByIndex(data:any) {
    data.sort((a:any, b:any) => {
      return parseInt(a.date_index) - parseInt(b.date_index);
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  
  getValueForDay(fullDay: any, day: string) {
    // console.log(fullDay.date)
    // console.log(day)
    const dayData = fullDay.jodiData.find((item: any) =>{
       return item.date_index == day
    });
    // console.log(dayData)
    if(dayData == '' || dayData == undefined){
      return '-';
    } else {
      return `${dayData.open} - ${dayData.jodi}`;
    }
  }
}

