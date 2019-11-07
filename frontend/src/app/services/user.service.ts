import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, Response, Role } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = URL + '/user';

  constructor(private http: HttpClient) {}

  getRoles(): Promise<Role[]> {
    return this.http.get<Role[]>(`${this.url}/roles/get`, HttpHeader).toPromise();
  }

  isAdmin(): Promise<boolean> {
    return this.http.get<boolean>(`${this.url}/isadmin`, HttpHeader).toPromise();
  }

  getId(): Promise<number> {
    return this.http.get<number>(`${this.url}/get-id`, HttpHeader).toPromise();
  }

  getUser(user: number): Promise<User> {
    return this.http.get<User>(`${this.url}/get/${user}`, HttpHeader).toPromise();
  }

  changePassword(user: number, password: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/password/change`, { user, password }, HttpHeader).toPromise();
  }

  checkPassword(user: number, password: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/password/check`, { user, password }, HttpHeader).toPromise();
  }

  updateUser(user: number, name: string, tShirtSize: string, allergy: string, claass: string): Promise<Response> {
    return this.http
      .post<Response>(`${this.url}/update`, { user, name, tShirtSize, allergy, class: claass }, HttpHeader)
      .toPromise();
  }

  getAccessLevel(): Promise<number> {
    return this.http.get<number>(`${this.url}/accesslevel`, HttpHeader).toPromise();
  }
}
