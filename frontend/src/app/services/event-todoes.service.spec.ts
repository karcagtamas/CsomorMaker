import { TestBed } from '@angular/core/testing';

import { EventTodoesService } from './event-todoes.service';

describe('EventTodoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventTodoesService = TestBed.get(EventTodoesService);
    expect(service).toBeTruthy();
  });
});
