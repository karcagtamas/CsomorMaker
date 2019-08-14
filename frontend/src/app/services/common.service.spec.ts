import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { Observable } from 'rxjs';

describe('CommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonService = TestBed.get(CommonService);
    expect(service).toBeTruthy();
  });

  describe('emitChange', () => {
    it('should change', (done: DoneFn) => {
      const service: CommonService = TestBed.get(CommonService);
      const value = 'test';
      service.changeEmitted$.subscribe(res => {
        expect(res).toEqual(value);
        done();
      });
      service.emitChange(value);
    });
  });
});
