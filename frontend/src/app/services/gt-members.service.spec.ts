import { TestBed } from '@angular/core/testing';

import { GtMembersService } from './gt-members.service';

describe('GtMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtMembersService = TestBed.get(GtMembersService);
    expect(service).toBeTruthy();
  });
});
