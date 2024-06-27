import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../shared/global.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SocialMediaComponent } from '../../components/social-media/social-media.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SocialMediaComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: any = FormGroup;
  countryData: any;
  socialLinksData:any
  status: any;
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  constructor(private fb: FormBuilder, private global: GlobalService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    // this.global.getWithoutToken('social-links').subscribe({
    //   next: (res:any)=>{
    //   this.socialLinksData = res.data
    //   console.log(res)
    //   },
    //   error: (err:any)=>{
    //     console.log(err)
    //   }
    // })
    this.getCOuntry();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  // getCOuntry(){
  //   this.global.getCountry().subscribe({
  //     next: (res:any)=>{
  //       this.countryData = res
  //     }
  //   })
  // }


  getCOuntry() {
    this.global.getCountry().subscribe({
      next: (res: any) => {
        this.countryData = res;
      },
    });
  }

  onSubmit(data: any): void {
    console.log(data);

    if (this.contactForm.valid) {
      this.global.postWitoken(data, 'create-form').subscribe({
        next: (res: any) => {
          this.status = res.message;
          // this.contactForm.reset()
          this.contactForm.reset({
            name: '',
            email: '',
            number: '',
            message: '',
            country: '',
          });
        },
        error: (err: any) => {
          this.contactForm.reset({
            name: '',
            email: '',
            number: '',
            message: '',
            country: '',
          });

          // this.contactForm.reset()
        },
      });
    }
  }
}
