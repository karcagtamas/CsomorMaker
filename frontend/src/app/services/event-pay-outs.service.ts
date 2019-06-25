import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventPayOut, EventPayOutType, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventPayOutsService {
  url = URL + '/event/payouts';
  constructor(public http: HttpClient) {}

  getPayOuts(id: number): Promise<EventPayOut[]> {
    return this.http.get<EventPayOut[]>(`${this.url}/get/${id}`, HttpHeader).toPromise();
  }

  getPayOutTypes(): Promise<EventPayOutType[]> {
    return this.http.get<EventPayOutType[]>(`${this.url}/types/get`, HttpHeader).toPromise();
  }

  addPayout(payout: EventPayOut): Promise<Response> {
    return this.http
      .post<Response>(
        `${this.url}/add`,
        { name: payout.name, eventId: payout.eventId, cost: payout.cost, type: payout.typeId },
        HttpHeader
      )
      .toPromise();
  }

  deletePayout(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${id}`, HttpHeader).toPromise();
  }
}
