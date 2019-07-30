import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  url = URL + '/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Promise<Notification[]> {
    return this.http.get<Notification[]>(`${this.url}/get`, HttpHeader).toPromise();
  }
}
