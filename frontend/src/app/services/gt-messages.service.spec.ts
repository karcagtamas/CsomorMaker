import { TestBed } from '@angular/core/testing';

import { GtMessagesService } from './gt-messages.service';

describe('GtMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtMessagesService = TestBed.get(GtMessagesService);
    expect(service).toBeTruthy();
  });
});
