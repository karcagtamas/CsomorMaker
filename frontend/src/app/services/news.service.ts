import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { News, Response } from '../models';
import { HttpClient } from '@angular/common/http';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = URL + '/news';

  constructor(private http: HttpClient) {}

  getNews(): Promise<News[]> {
    return this.http.get<News[]>(`${this.url}/get`, HttpHeader).toPromise();
  }

  addNews(text: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { text }, HttpHeader).toPromise();
  }

  updateNews(id: number, text: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { id, text }, HttpHeader).toPromise();
  }

  deleteNews(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${id}`, HttpHeader).toPromise();
  }
}
