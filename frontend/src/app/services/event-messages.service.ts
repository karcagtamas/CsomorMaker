import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventMessage } from 'src/app/models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventMessagesService {
  url = URL + '/event/messages';

  constructor(public http: HttpClient) {}

  getEventMessages(event: number): Promise<EventMessage[]> {
    return this.http.get<EventMessage[]>(`${this.url}/get/${event}`, HttpHeader).toPromise();
  }

  addEventMessage(event: number, text: string, sender: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { event, text, sender }, HttpHeader).toPromise();
  }
}
