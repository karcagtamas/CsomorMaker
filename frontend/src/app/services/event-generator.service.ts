import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventWork, EventWorkTable, EventWorker, EventWorkStatus, Response } from '../models';
import { EventWorkerTable } from '../models/event.worker.table.model';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventGeneratorService {
  workUrl = URL + '/event/works';
  workerUrl = URL + '/event/workers';
  constructor(public http: HttpClient) {}

  public getWorks(id: number): Promise<EventWork[]> {
    return this.http.get<EventWork[]>(`${this.workUrl}/get/${id}`, HttpHeader).toPromise();
  }

  deleteWork(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.workUrl}/delete/${id}`, HttpHeader).toPromise();
  }

  addWork(name: string, eventId: number): Promise<Response> {
    return this.http.post<Response>(`${this.workUrl}/add`, { name, eventId }, HttpHeader).toPromise();
  }

  getWorkTables(id: number): Promise<EventWorkTable[]> {
    return this.http.get<EventWorkTable[]>(`${this.workUrl}/tables/get/${id}`, HttpHeader).toPromise();
  }

  setIsActiveWorkHour(day: number, hour: number, work: number): Promise<Response> {
    return this.http.post<Response>(`${this.workUrl}/tables/set`, { day, hour, work }, HttpHeader).toPromise();
  }

  getEventLowWorkers(id: number): Promise<EventWorker[]> {
    return this.http.get<EventWorker[]>(`${this.workerUrl}/get/${id}`, HttpHeader).toPromise();
  }

  getWorkerTables(id: number, event: number): Promise<EventWorkerTable[]> {
    return this.http.get<EventWorkerTable[]>(`${this.workerUrl}/tables/get/${id}/${event}`, HttpHeader).toPromise();
  }

  setIsAvaiableWorkerHour(day: number, hour: number, worker: number, event: number): Promise<Response> {
    return this.http
      .post<Response>(`${this.workerUrl}/tables/set`, { day, hour, worker, event }, HttpHeader)
      .toPromise();
  }

  getWorkStatuses(worker: number, event: number): Promise<EventWorkStatus[]> {
    return this.http.get<EventWorkStatus[]>(`${this.workUrl}/statuses/get/${event}/${worker}`, HttpHeader).toPromise();
  }

  setIsValidWorkStatus(worker: number, work: number): Promise<Response> {
    return this.http.post<Response>(`${this.workUrl}/statuses/set`, { worker, work }, HttpHeader).toPromise();
  }

  generate(event: number): Promise<Response> {
    return this.http.get<Response>(`${URL}/event/generate/${event}`, HttpHeader).toPromise();
  }
}
