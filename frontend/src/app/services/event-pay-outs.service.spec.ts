import { TestBed } from '@angular/core/testing';

import { EventPayOutsService } from './event-pay-outs.service';

describe('EventPayOutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPayOutsService = TestBed.get(EventPayOutsService);
    expect(service).toBeTruthy();
  });
});
