import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gt } from '../models';
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

  getAccessLevel(gt: number): Promise<number> {
    return this.http.get<number>(`${this.url}/accessLevel/${gt}`, HttpHeader).toPromise();
  }
}
