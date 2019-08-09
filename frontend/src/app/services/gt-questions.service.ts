import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtQuestion, Response, GtAnswer } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtQuestionsService {
  url = URL + '/gt/questions';

  constructor(private http: HttpClient) {}

  getGtQuestions(gt: number): Promise<GtQuestion[]> {
    return this.http.get<GtQuestion[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtQuestion(gt: number, question: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, question }, HttpHeader).toPromise();
  }

  updateGtQuestion(id: number, question: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { id, question }, HttpHeader).toPromise();
  }

  deleteGtQuestion(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${id}`, HttpHeader).toPromise();
  }

  getGtAnswers(question: number): Promise<GtAnswer[]> {
    return this.http.get<GtAnswer[]>(`${this.url}/answers/get/${question}`, HttpHeader).toPromise();
  }

  addGtAnswer(question: number, answer: string, creater: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/answers/add`, { question, answer, creater }, HttpHeader).toPromise();
  }
}
