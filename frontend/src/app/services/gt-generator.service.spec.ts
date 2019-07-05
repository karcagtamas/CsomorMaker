import { TestBed } from '@angular/core/testing';

import { GtGeneratorService } from './gt-generator.service';

describe('GtGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtGeneratorService = TestBed.get(GtGeneratorService);
    expect(service).toBeTruthy();
  });
});
