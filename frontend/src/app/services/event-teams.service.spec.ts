import { TestBed } from '@angular/core/testing';

import { EventTeamsService } from './event-teams.service';

describe('EventTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventTeamsService = TestBed.get(EventTeamsService);
    expect(service).toBeTruthy();
  });
});
