import { TestBed } from '@angular/core/testing';

import { GtClassesService } from './gt-classes.service';

describe('GtClassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtClassesService = TestBed.get(GtClassesService);
    expect(service).toBeTruthy();
  });
});
