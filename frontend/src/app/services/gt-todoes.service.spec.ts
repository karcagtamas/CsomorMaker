import { TestBed } from '@angular/core/testing';

import { GtTodoesService } from './gt-todoes.service';

describe('GtTodoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtTodoesService = TestBed.get(GtTodoesService);
    expect(service).toBeTruthy();
  });
});
