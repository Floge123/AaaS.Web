import { TestBed } from '@angular/core/testing';

import { MetricServiceService } from './metric.service';

describe('MetricServiceService', () => {
  let service: MetricServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
