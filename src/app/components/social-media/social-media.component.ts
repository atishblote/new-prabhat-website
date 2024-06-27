import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {
  socialLinksData: any;

  constructor(private global: GlobalService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.global.getWithoutToken('social-links').subscribe({
      next: (res: any) => {
        this.socialLinksData = res.data;
        this.cdr.detectChanges(); // Manually trigger change detection
        // console.log(res);
      },
      error: (err: any) => {
        // console.log(err);
      }
    });
  }
}
