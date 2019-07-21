import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtMessage, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtMessagesService {
  url = URL + '/gt/messages';

  constructor(private http: HttpClient) {}

  getGtMessages(gt: number): Promise<GtMessage[]> {
    return this.http.get<GtMessage[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtMessage(gt: number, message: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, message }, HttpHeader).toPromise();
  }
}
