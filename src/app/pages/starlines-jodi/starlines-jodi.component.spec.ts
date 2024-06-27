import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarlinesJodiComponent } from './starlines-jodi.component';

describe('StarlinesJodiComponent', () => {
  let component: StarlinesJodiComponent;
  let fixture: ComponentFixture<StarlinesJodiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarlinesJodiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarlinesJodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
