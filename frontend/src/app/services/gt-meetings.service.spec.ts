import { TestBed } from '@angular/core/testing';

import { GtMeetingsService } from './gt-meetings.service';

describe('GtMeetingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtMeetingsService = TestBed.get(GtMeetingsService);
    expect(service).toBeTruthy();
  });
});
