import { TestBed } from '@angular/core/testing';

import { GtPresentingServiceService } from './gt-presenting-service.service';

describe('GtPresentingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtPresentingServiceService = TestBed.get(GtPresentingServiceService);
    expect(service).toBeTruthy();
  });
});
