import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorToggleButtonComponent } from './detector-toggle-button.component';

describe('DetectorToogleButtonComponent', () => {
  let component: DetectorToggleButtonComponent;
  let fixture: ComponentFixture<DetectorToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorToggleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
