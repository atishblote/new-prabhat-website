import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularPanelComponent } from './regular-panel.component';

describe('RegularPanelComponent', () => {
  let component: RegularPanelComponent;
  let fixture: ComponentFixture<RegularPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
