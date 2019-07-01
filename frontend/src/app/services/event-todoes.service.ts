import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, EventTodo } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventTodoesService {
  url = URL + '/event/todoes';

  constructor(public http: HttpClient) { }

  getEventTodoes(event: number): Promise<EventTodo[]>{
    return this.http.get<EventTodo[]>(`${this.url}/get/${event}`, HttpHeader).toPromise();
  }

  updateEventTodo(todo: number, text: string, importance: number, expiration: Date): Promise<Response>{
    return this.http.get<Response>(`${this.url}/update/${event}`, HttpHeader).toPromise();
  }
}
