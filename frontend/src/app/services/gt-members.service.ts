import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtMember, Response, User } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtMembersService {
  url = URL + '/gt/members';

  constructor(private http: HttpClient) {}

  getGtMembers(gt: number): Promise<GtMember[]> {
    return this.http.get<GtMember[]>(`${this.url}/get/all/${gt}`, HttpHeader).toPromise();
  }

  getNonGtMembers(gt: number): Promise<User[]> {
    return this.http.get<User[]>(`${this.url}/get/none/${gt}`, HttpHeader).toPromise();
  }

  addGtMember(gt: number, user: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, user }, HttpHeader).toPromise();
  }

  deleteGtMember(gt: number, user: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/delete`, { gt, user }, HttpHeader).toPromise();
  }

  updateGtMember(gt: number, user: number, role: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { gt, user, role }, HttpHeader).toPromise();
  }
}
