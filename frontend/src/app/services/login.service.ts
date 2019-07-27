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

  isLoggedIn(): Promise<boolean> {
    return this.http.get<boolean>(`${URL}/user/isloggedin`, HttpHeader).toPromise();
  }

  logout(): Promise<Response> {
    return this.http.get<Response>(`${URL}/user/logout`, HttpHeader).toPromise();
  }

  checkResetDetails(username: string, email: string): Promise<Response> {
    return this.http.post<Response>(`${URL}/user/reset`, { username, email }, HttpHeader).toPromise();
  }
}
