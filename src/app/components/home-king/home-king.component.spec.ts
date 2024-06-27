import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeKingComponent } from './home-king.component';

describe('HomeKingComponent', () => {
  let component: HomeKingComponent;
  let fixture: ComponentFixture<HomeKingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeKingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeKingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
