import { TestBed } from '@angular/core/testing';

import { EventMembersService } from './event-members.service';

describe('EventMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventMembersService = TestBed.get(EventMembersService);
    expect(service).toBeTruthy();
  });
});
