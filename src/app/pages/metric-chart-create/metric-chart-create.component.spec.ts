import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricChartCreateComponent } from './metric-chart-create.component';

describe('MetricChartCreateComponent', () => {
  let component: MetricChartCreateComponent;
  let fixture: ComponentFixture<MetricChartCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricChartCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricChartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
