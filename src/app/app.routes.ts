import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegularJodiComponent } from './pages/regular-jodi/regular-jodi.component';
import { RegularPanelComponent } from './pages/regular-panel/regular-panel.component';
import { StarlinesJodiComponent } from './pages/starlines-jodi/starlines-jodi.component';
import { KingsJodiComponent } from './pages/kings-jodi/kings-jodi.component';
import { HelpsComponent } from './pages/helps/helps.component';
import { FirstComponent } from './helps/first/first.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [
    {path: '', title:"Prabhat Satta Matka | Prabhat Matka Results | Prabhat Night", component: HomeComponent},
    {path: 'jodi/:id',title:"Jodi Prabhat Satta Matka | Jodi Prabhat Matka Results | Jodi Prabhat Night",  component: RegularJodiComponent},
    {path: 'panel/:id',title:"Panel Prabhat Satta Matka | Jodi Prabhat Matka Results | Jodi Prabhat Night",  component: RegularPanelComponent},
    {path: 'starline/:id',title:"Starline Prabhat Satta Matka | Jodi Prabhat Matka Results | Jodi Prabhat Night",  component: StarlinesJodiComponent},
    {path: 'king/:id',title:"King Prabhat Satta Matka | Jodi Prabhat Matka Results | Jodi Prabhat Night",  component: KingsJodiComponent},
    {path: 'about-us',title:"About Prabhat Satta Matka",  component: AboutUsComponent},
    {path: 'contact-us',title:"Contact us Prabhat Satta Matka",  component: ContactUsComponent},
    {path: 'help',title:"Help Prabhat Satta Matka",  component: HelpsComponent}
];
