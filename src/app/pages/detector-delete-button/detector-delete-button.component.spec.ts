import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorDeleteButtonComponent } from './detector-delete-button.component';

describe('DetectorDeleteButtonComponent', () => {
  let component: DetectorDeleteButtonComponent;
  let fixture: ComponentFixture<DetectorDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetectorDeleteButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectorDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
