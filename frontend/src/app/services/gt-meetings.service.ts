import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GtMeeting, Response, GtMeetingMember } from '../models';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtMeetingsService {
  url = URL + '/gt/meetings';

  constructor(private http: HttpClient) {}

  getGtMeetings(gt: number): Promise<GtMeeting[]> {
    return this.http.get<GtMeeting[]>(`${this.url}/get/${gt}`, HttpHeader).toPromise();
  }

  addGtMeeting(date: Date, gt: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { date, gt }, HttpHeader).toPromise();
  }

  updateGtMeeting(date: Date, meeting: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { date, id: meeting }, HttpHeader).toPromise();
  }

  deleteGtMeeting(meeting: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${meeting}`, HttpHeader).toPromise();
  }

  getGtMeetingMembers(meeting: number): Promise<GtMeetingMember[]> {
    return this.http.get<GtMeetingMember[]>(`${this.url}/members/get/${meeting}`, HttpHeader).toPromise();
  }

  setGtMeetingMemberThereStatus(meeting: number, user: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/members/set/${meeting}/${user}`, HttpHeader).toPromise();
  }
}
