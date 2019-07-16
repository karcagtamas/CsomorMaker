import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gt, Response } from '../models';
import { HttpClient } from '@angular/common/http';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtService {
  url = URL + '/gt';

  constructor(private http: HttpClient) {}

  getGts(): Promise<Gt[]> {
    return this.http.get<Gt[]>(`${this.url}/get`, HttpHeader).toPromise();
  }

  updateGt(gt: Gt): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { gt }, HttpHeader).toPromise();
  }

  addGt(year: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { year }, HttpHeader).toPromise();
  }

  getAccessLevel(gt: number): Promise<number> {
    return this.http.get<number>(`${this.url}/accesslevel/${gt}`, HttpHeader).toPromise();
  }

  lockGt(gt: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/lock/${gt}`, HttpHeader).toPromise();
  }

  generate(gt: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/generate/${gt}`, HttpHeader).toPromise();
  }
}
