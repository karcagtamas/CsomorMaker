import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, Event, Gt, Response } from '../models';

const URL = environment.api;
const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminUrl = URL + '/admin';
  constructor(public http: HttpClient) {}

  public getAllUser(): Promise<User[]> {
    return this.http.get<User[]>(`${this.adminUrl}/users/get`, HttpHeader).toPromise();
  }

  public updateUserRole(userId: number, roleId: number): Promise<Response> {
    return this.http.post<Response>(`${this.adminUrl}/users/update`, { userId, roleId }, HttpHeader).toPromise();
  }

  public blockUser(userId: number, status: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.adminUrl}/users/block`, { userId, status }, HttpHeader).toPromise();
  }

  public getAllEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(`${this.adminUrl}/events/get`, HttpHeader).toPromise();
  }

  public updateEventArchiveStatus(eventId: number, status: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.adminUrl}/events/update`, { eventId, status }, HttpHeader).toPromise();
  }

  public getAllGt(): Promise<Gt[]> {
    return this.http.get<Gt[]>(`${this.adminUrl}/gts/get`, HttpHeader).toPromise();
  }

  public updateGtArchiveStatus(gtId: number, status: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.adminUrl}/gts/update`, { gtId, status }, HttpHeader).toPromise();
  }
}
