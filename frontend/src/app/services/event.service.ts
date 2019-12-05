import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event, Response, EventMember, EventRole, User } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

interface CountOfCost {
  countOfCosts: number;
  countOfDeposits: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = URL + '/event';
  constructor(public http: HttpClient) {}

  getEventAccessLevel(event: number): Promise<number> {
    return this.http.get<number>(`${this.url}/accesslevel/${event}`, HttpHeader).toPromise();
  }

  getEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(`${this.url}/get`, HttpHeader).toPromise();
  }

  addEvent(name: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { name }, HttpHeader).toPromise();
  }

  getEvent(id: number): Promise<Event> {
    return this.http.get<Event>(`${this.url}/get-one/${id}`, HttpHeader).toPromise();
  }

  updateEvent(event: Event): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { event }, HttpHeader).toPromise();
  }

  lockEvent(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/lock/${id}`, HttpHeader).toPromise();
  }

  increaseVisitors(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/visitors/inc/${id}`, HttpHeader).toPromise();
  }

  decreaseVisitors(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/visitors/dec/${id}`, HttpHeader).toPromise();
  }

  increaseInjured(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/injured/inc/${id}`, HttpHeader).toPromise();
  }

  decreaseInjured(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/injured/dec/${id}`, HttpHeader).toPromise();
  }

  getEventRoles(id: number): Promise<EventRole[]> {
    return this.http.get<EventRole[]>(`${this.url}/roles/get/${id}`, HttpHeader).toPromise();
  }

  addEventRole(event: number, name: string, accessLevel: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/roles/add`, { event, name, accessLevel }, HttpHeader).toPromise();
  }

  updateEventRole(id: number, name: string, accessLevel: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/roles/update`, { id, name, accessLevel }, HttpHeader).toPromise();
  }

  deleteEventRole(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/roles/delete/${id}`, HttpHeader).toPromise();
  }

  disableEvent(event: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/disable/${event}`, HttpHeader).toPromise();
  }

  countOfAllCost(event: number): Promise<CountOfCost> {
    return this.http.get<CountOfCost>(`${this.url}/costs/${event}`, HttpHeader).toPromise();
  }
}
