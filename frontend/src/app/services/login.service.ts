import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) {}

  login(username: string, password: string): Promise<Response> {
    return this.http.post<Response>(`${URL}/user/login`, { username, password }, HttpHeader).toPromise();
  }

  registration(username: string, email: string, password: string): Promise<Response> {
    return this.http.post<Response>(`${URL}/user/reg`, { username, email, password }, HttpHeader).toPromise();
  }

  isLoggedIn(username: string): Promise<boolean> {
    return this.http.post<boolean>(`${URL}/user/isloggedin`, { username }, HttpHeader).toPromise();
  }

  logout(): Promise<Response> {
    return this.http.get<Response>(`${URL}/user/logout`, HttpHeader).toPromise();
  }
}
