import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response, GtClass, GtClassMember } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtClassesService {
  url = URL + '/gt/classes';
  memberUrl = URL + '/gt/classes/members';

  constructor(private http: HttpClient) {}

  getGtClasses(gt: number): Promise<GtClass[]> {
    return this.http.get<GtClass[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtClass(gt: number, name: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { gt, name }, HttpHeader).toPromise();
  }

  deleteGtClass(claass: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${claass}`, HttpHeader).toPromise();
  }

  updateGtClass(claass: number, name: string, tShirtColor: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { class: claass, name, tShirtColor }, HttpHeader).toPromise();
  }

  getGtClassMembers(claass: number): Promise<GtClassMember[]> {
    return this.http.get<GtClassMember[]>(`${this.memberUrl}/get/${claass}`, HttpHeader).toPromise();
  }

  addGtClassMember(
    claass: number,
    name: string,
    description: string,
    allergy: string,
    tShirtSize: string
  ): Promise<Response> {
    return this.http
      .post<Response>(`${this.memberUrl}/add`, { class: claass, name, description, allergy, tShirtSize }, HttpHeader)
      .toPromise();
  }

  deleteGtClassMember(member: number): Promise<Response> {
    return this.http.get<Response>(`${this.memberUrl}/delete/${member}`, HttpHeader).toPromise();
  }

  updateGtClassMember(
    member: number,
    name: string,
    description: string,
    allergy: string,
    tShirtSize: string
  ): Promise<Response> {
    return this.http
      .post<Response>(`${this.memberUrl}/update`, { member, name, description, allergy, tShirtSize }, HttpHeader)
      .toPromise();
  }

  setGtClassMemberPaidStatus(member: number): Promise<Response> {
    return this.http.get<Response>(`${this.memberUrl}/set/${member}`, HttpHeader).toPromise();
  }
}
