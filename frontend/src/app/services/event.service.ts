import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event, Response, EventPayOut, EventPayOutType, EventWork, EventWorker, EventWorkStatus } from '../models';
import { EventWorkTable } from '../models/event.work.table.model';
import { EventWorkerTable } from '../models/event.worker.table.model';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(public http: HttpClient) {}

  getEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(`${URL}/event/get`, HttpHeader).toPromise();
  }

  addEvent(name: string): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/add`, { name }, HttpHeader).toPromise();
  }

  getEvent(id: number): Promise<Event> {
    return this.http.post<Event>(`${URL}/event/get-one`, { id }, HttpHeader).toPromise();
  }

  updateEvent(event: Event): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/update`, { event }, HttpHeader).toPromise();
  }

  lockEvent(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/lock`, { id }, HttpHeader).toPromise();
  }

  increaseVisitors(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/inc-visitors`, { id }, HttpHeader).toPromise();
  }

  decreaseVisitors(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/dec-visitors`, { id }, HttpHeader).toPromise();
  }

  increaseInjured(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/inc-injured`, { id }, HttpHeader).toPromise();
  }

  decreaseInjured(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/dec-injured`, { id }, HttpHeader).toPromise();
  }

  getPayOuts(id: number): Promise<EventPayOut[]> {
    return this.http.post<EventPayOut[]>(`${URL}/event/get-payouts`, { id }, HttpHeader).toPromise();
  }

  getPayOutTypes(): Promise<EventPayOutType[]> {
    return this.http.get<EventPayOutType[]>(`${URL}/event/get-payouttypes`, HttpHeader).toPromise();
  }

  addPayout(payout: EventPayOut): Promise<Response> {
    return this.http
      .post<Response>(
        `${URL}/event/add-payout`,
        { name: payout.name, eventId: payout.eventId, cost: payout.cost, type: payout.typeId },
        HttpHeader
      )
      .toPromise();
  }

  deletePayout(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/delete-payout`, { id }, HttpHeader).toPromise();
  }

  getWorks(id: number): Promise<EventWork[]> {
    return this.http.post<EventWork[]>(`${URL}/event/get-works`, { id }, HttpHeader).toPromise();
  }

  deleteWork(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/delete-work`, { id }, HttpHeader).toPromise();
  }

  addWork(name: string, eventId: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/add-work`, { name, eventId }, HttpHeader).toPromise();
  }

  getWorkTablesWithoutWorkerNames(id: number): Promise<EventWorkTable[]> {
    return this.http.post<EventWorkTable[]>(`${URL}/event/get-work-tables`, { id }, HttpHeader).toPromise();
  }

  setIsActiveWorkHour(day: number, hour: number, work: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/set-work-table-active`, { day, hour, work }, HttpHeader).toPromise();
  }

  getEventLowWorkers(id: number): Promise<EventWorker[]> {
    return this.http.post<EventWorker[]>(`${URL}/event/get-low-workers`, { id }, HttpHeader).toPromise();
  }

  getWorkerTablesWithoutWorkNames(id: number, event: number): Promise<EventWorkerTable[]> {
    return this.http.post<EventWorkerTable[]>(`${URL}/event/get-worker-tables`, { id, event }, HttpHeader).toPromise();
  }

  setIsAvaiableWorkerHour(day: number, hour: number, worker: number, event: number): Promise<Response> {
    return this.http
      .post<Response>(`${URL}/event/set-worker-table-avaiable`, { day, hour, worker, event }, HttpHeader)
      .toPromise();
  }

  getWorkStatuses(worker: number, event: number): Promise<EventWorkStatus[]> {
    return this.http
      .post<EventWorkStatus[]>(`${URL}/event/get-work-statuses`, { worker, event }, HttpHeader)
      .toPromise();
  }

  setIsValidWorkStatus(worker: number, work: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/set-work-status-valid`, { worker, work }, HttpHeader).toPromise();
  }

  generate(event: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/generate`, { event }, HttpHeader).toPromise();
  }
}
