import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtTodo, Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtTodoesService {
  url = URL + '/gt/todoes';

  constructor(private http: HttpClient) {}

  getGtTodoes(gt: number): Promise<GtTodo[]> {
    return this.http.get<GtTodo[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtTodo(gt: number, text: string, importance: number, exp: Date): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, text, importance, exp }, HttpHeader).toPromise();
  }

  deleteGtTodo(todo: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${todo}`, HttpHeader).toPromise();
  }

  updateGtTodo(todo: number, text: string, importance: number, exp: Date): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { todo, text, importance, exp }, HttpHeader).toPromise();
  }
}
