import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(public http: HttpClient) {}

  getEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(`${URL}/event/get`, HttpHeader).toPromise();
  }

  addEvent(name: string): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/add`, { name }, HttpHeader).toPromise();
  }

  getEvent(id: number): Promise<Event> {
    return this.http.post<Event>(`${URL}/event/get-one`, { id }, HttpHeader).toPromise();
  }

  updateEvent(event: Event): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/update`, { event }, HttpHeader).toPromise();
  }

  lockEvent(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/lock`, { id }, HttpHeader).toPromise();
  }

  increaseVisitors(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/inc-visitors`, { id }, HttpHeader).toPromise();
  }

  decreaseVisitors(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/dec-visitors`, { id }, HttpHeader).toPromise();
  }

  increaseInjured(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/inc-injured`, { id }, HttpHeader).toPromise();
  }

  decreaseInjured(id: number): Promise<Response> {
    return this.http.post<Response>(`${URL}/event/dec-injured`, { id }, HttpHeader).toPromise();
  }
}
