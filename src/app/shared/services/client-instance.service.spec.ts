import { TestBed } from '@angular/core/testing';

import { ClientInstanceService } from './client-instance.service';

describe('ClientinstanceService', () => {
  let service: ClientInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
