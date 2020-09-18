import { TestBed } from '@angular/core/testing';

import { DeptServiceService } from './dept-service.service';

describe('DeptServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeptServiceService = TestBed.get(DeptServiceService);
    expect(service).toBeTruthy();
  });
});
