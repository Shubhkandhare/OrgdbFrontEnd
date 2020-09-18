import { TestBed } from '@angular/core/testing';

import { AreaServiceService } from './area-service.service';

describe('AreaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaServiceService = TestBed.get(AreaServiceService);
    expect(service).toBeTruthy();
  });
});
