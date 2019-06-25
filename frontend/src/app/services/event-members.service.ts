import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventMember, User, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventMembersService {
  url = URL + '/event/members';
  constructor(public http: HttpClient) {}

  getEventMembers(event: number): Promise<EventMember[]> {
    return this.http.get<EventMember[]>(`${this.url}/get/all/${event}`, HttpHeader).toPromise();
  }

  getEventNonMembers(event: number): Promise<User[]> {
    return this.http.get<User[]>(`${this.url}/get/none/${event}`, HttpHeader).toPromise();
  }

  addUserToEvent(user: number, event: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { event, user }, HttpHeader).toPromise();
  }

  deleteUserFromEvent(user: number, event: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/delete`, { event, user }, HttpHeader).toPromise();
  }

  updateEventUser(user: number, event: number, role: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { event, user, role }, HttpHeader).toPromise();
  }
}
