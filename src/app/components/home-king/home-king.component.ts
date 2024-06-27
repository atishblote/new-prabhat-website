import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-king',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-king.component.html',
  styleUrl: './home-king.component.scss'
})
export class HomeKingComponent {

  allSTarlineData:any
  constructor(private global:GlobalService){}

  ngOnInit(): void {
    this.global.getWithoutToken("all-king-todays").subscribe({
      next: (res:any)=>{
        this.allSTarlineData = res.data
        // //console.log(this.allSTarlineData)
      },
      error: (err:any)=>{
        //console.log(err.error)
      }
    })
  }
}