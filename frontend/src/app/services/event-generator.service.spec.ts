import { EventWork } from './../models';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventGeneratorService } from './event-generator.service';

fdescribe('EventGeneratorService', () => {
  let httpTestingController: HttpTestingController;
  let service: EventGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventGeneratorService],
      imports: [HttpClientTestingModule]
    });

    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(EventGeneratorService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getWorks', () => {
    it('get mock datas', (done: DoneFn) => {
      const mockWorks: EventWork[] = [{ name: 'Tamas', id: 1, event: 1 }];

      service.getWorks(1).then(res => {
        expect(res.length).toEqual(1);
        for (let i = 0; i < res.length; i++) {
          expect(res[i].name).toEqual(mockWorks[i].name);
        }
        done();
      });

      const req = httpTestingController.expectOne(`${service.workUrl}/get/1`);

      expect(req.request.method).toEqual('GET');

      req.flush(mockWorks);
    });
  });
});
