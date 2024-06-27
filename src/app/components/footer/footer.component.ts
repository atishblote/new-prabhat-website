import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialMediaComponent } from '../social-media/social-media.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, SocialMediaComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
