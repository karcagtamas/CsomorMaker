import { TestBed } from '@angular/core/testing';

import { GtPayoutsService } from './gt-payouts.service';

describe('GtPayoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtPayoutsService = TestBed.get(GtPayoutsService);
    expect(service).toBeTruthy();
  });
});
