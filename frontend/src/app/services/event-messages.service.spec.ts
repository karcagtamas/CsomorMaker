import { TestBed } from '@angular/core/testing';

import { EventMessagesService } from './event-messages.service';

describe('EventMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventMessagesService = TestBed.get(EventMessagesService);
    expect(service).toBeTruthy();
  });
});
