import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { TimeStatusPipe } from '../../pipes/time-status.pipe';
import { TimeToSecondsPipe } from '../../pipes/time-to-seconds.pipe';
import { LoadingTextPipe } from '../../pipes/loading-text.pipe';
import { NgClass, NgStyle } from '@angular/common';
import { HomeStarlineComponent } from '../../components/home-starline/home-starline.component';
import { RouterLink } from '@angular/router';
import { HomeKingComponent } from '../../components/home-king/home-king.component';
import { FirstComponent } from '../../helps/first/first.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FirstComponent, TimeStatusPipe,TimeToSecondsPipe,LoadingTextPipe, NgClass,NgStyle, HomeStarlineComponent,HomeKingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  liveBazaarData:any
  addClass=false
  constructor( private global:GlobalService) {}
  ngOnInit(): void {
    

    // call api
    this.global.getWithoutToken("all-bazaar-todays").subscribe({
      next: (res:any)=>{
        // console.log(res)
        this.liveBazaarData = res.data
      },error : (err:any)=>{
        console.log(err)
      }
    })
  }

// on click
toggleClass() {
  this.addClass = !this.addClass;
}

// conditional class
getClass() {
  return this.addClass ? 'full_height' : '';
}
}
