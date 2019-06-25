import { TestBed } from '@angular/core/testing';

import { EventGeneratorService } from './event-generator.service';

describe('EventGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventGeneratorService = TestBed.get(EventGeneratorService);
    expect(service).toBeTruthy();
  });
});
