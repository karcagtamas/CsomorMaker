import { TestBed } from '@angular/core/testing';

import { GtQuestionsService } from './gt-questions.service';

describe('GtQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtQuestionsService = TestBed.get(GtQuestionsService);
    expect(service).toBeTruthy();
  });
});
