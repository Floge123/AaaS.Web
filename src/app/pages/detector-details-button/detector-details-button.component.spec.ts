import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorDetailsButtonComponent } from './detector-details-button.component';

describe('DetectorDetailsButtonComponent', () => {
  let component: DetectorDetailsButtonComponent;
  let fixture: ComponentFixture<DetectorDetailsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorDetailsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorDetailsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
