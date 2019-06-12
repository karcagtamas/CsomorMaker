import { HttpClient } from '@angular/common/http/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  isAdmin(): Promise<boolean> {
    return this.http.get<boolean>(`${URL}/user/isadmin`, HttpHeader).toPromise();
  }
}
