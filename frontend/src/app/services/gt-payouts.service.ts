import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtPayout, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtPayoutsService {
  url = URL + '/gt/payouts';

  constructor(private http: HttpClient) {}

  getGtPayouts(gt: number): Promise<GtPayout[]> {
    return this.http.get<GtPayout[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtPayout(gt: number, name: string, type: number, cost: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, name, type, cost }, HttpHeader).toPromise();
  }

  deleteGtPayout(payout: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${payout}`, HttpHeader).toPromise();
  }

  updateGtPayout(payout: number, name: string, type: number, cost: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { payout, name, type, cost }, HttpHeader).toPromise();
  }
}
