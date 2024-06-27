import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingsJodiComponent } from './kings-jodi.component';

describe('KingsJodiComponent', () => {
  let component: KingsJodiComponent;
  let fixture: ComponentFixture<KingsJodiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingsJodiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingsJodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
