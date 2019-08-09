import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtPresenting, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtPresentingServiceService {
  url = URL + '/gt/presentings';

  constructor(private http: HttpClient) {}

  getGtPresenting(gt: number): Promise<GtPresenting[]> {
    return this.http.get<GtPresenting[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  updatePresentingAnswer(gt: number, user1: number, user2: number, answer: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { gt, user1, user2, answer }, HttpHeader).toPromise();
  }

  setGtPresentingLicensedStatus(gt: number, user1: number, user2: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/set`, { gt, user1, user2 }, HttpHeader).toPromise();
  }
}
