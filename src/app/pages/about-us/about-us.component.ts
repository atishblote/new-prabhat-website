import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements  OnInit {

  constructor(private meta:Meta){}

  ngOnInit(): void {
    this.meta.updateTag({
      name: 'description',
      content: "About us the heart of Prabhat SattaMatka. Learn about our values and dedication to providing the best gaming experience",
    });
    this.meta.updateTag({
      property: 'og:title',
      content: "About Us -  Prabhat Satta Matka",
    });
    this.meta.updateTag({
      property: 'og:description',
      content: "About us the heart of Prabhat SattaMatka. Learn about our values and dedication to providing the best gaming experience",
    });
    this.meta.updateTag({
      property: 'og:url',
      content: "https://prabhat-sattamatka.com/about-us",
    });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
