import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, EventToDo } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class EventTodoesService {
  url = URL + '/event/todoes';

  constructor(public http: HttpClient) {}

  getEventTodoes(event: number): Promise<EventToDo[]> {
    return this.http.get<EventToDo[]>(`${this.url}/get/${event}`, HttpHeader).toPromise();
  }

  updateEventTodo(todo: number, text: string, importance: number, expiration: Date): Promise<Response> {
    return this.http
      .post<Response>(`${this.url}/update`, { todo, text, importance, expiration }, HttpHeader)
      .toPromise();
  }

  setSolvedTodo(todo: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/set/${todo}`, HttpHeader).toPromise();
  }

  addEventTodo(event: number, text: string, importance: number, expiration: Date): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { event, text, importance, expiration }, HttpHeader).toPromise();
  }
}
