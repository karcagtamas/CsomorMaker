import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtWork, Response, GtWorkTable, GtWorkStatus, GtWorker, GtWorkerTable } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtGeneratorService {
  workUrl = URL + '/gt/works';
  workerUrl = URL + '/gt/workers';

  constructor(private http: HttpClient) {}

  getGtWorks(gt: number): Promise<GtWork[]> {
    return this.http.get<GtWork[]>(`${this.workUrl}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtWork(gt: number, name: string, day: number, start: number, end: number, workers: number): Promise<Response> {
    return this.http
      .post<Response>(`${this.workUrl}/add`, { gt, name, day, start, end, workers }, HttpHeader)
      .toPromise();
  }

  updateGtWork(
    work: number,
    name: string,
    day: number,
    start: number,
    end: number,
    workers: number
  ): Promise<Response> {
    return this.http
      .post<Response>(`${this.workUrl}/update`, { work, name, day, start, end, workers }, HttpHeader)
      .toPromise();
  }

  deleteGtWork(work: number): Promise<Response> {
    return this.http.get<Response>(`${this.workUrl}/delete/${work}`, HttpHeader).toPromise();
  }

  getGtWorkTables(work: number): Promise<GtWorkTable[]> {
    return this.http.get<GtWorkTable[]>(`${this.workUrl}/tables/get/${work}`, HttpHeader).toPromise();
  }

  getGtWorkStatuses(worker: number, gt: number): Promise<GtWorkStatus[]> {
    return this.http.get<GtWorkStatus[]>(`${this.workUrl}/statuses/get/${worker}/${gt}`, HttpHeader).toPromise();
  }

  setGtWorkStatusIsBoss(worker: number, work: number): Promise<Response> {
    return this.http.get<Response>(`${this.workUrl}/statuses/set/boss/${worker}/${work}`, HttpHeader).toPromise();
  }

  setGtWorkStatusIsActive(worker: number, work: number): Promise<Response> {
    return this.http.get<Response>(`${this.workUrl}/statuses/set/active/${worker}/${work}`, HttpHeader).toPromise();
  }

  getLowGtWorkers(gt: number): Promise<GtWorker[]> {
    return this.http.get<GtWorker[]>(`${this.workerUrl}/get/${gt}`, HttpHeader).toPromise();
  }

  getGtWorkerTables(worker: number): Promise<GtWorkerTable[]> {
    return this.http.get<GtWorkerTable[]>(`${this.workerUrl}/tables/get/${worker}`, HttpHeader).toPromise();
  }
}
