import { TestBed, async, inject } from '@angular/core/testing';

import { GtGuard } from './gt.guard';

describe('GtGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GtGuard]
    });
  });

  it('should ...', inject([GtGuard], (guard: GtGuard) => {
    expect(guard).toBeTruthy();
  }));
});
