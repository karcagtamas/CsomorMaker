import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventTeam, Response, EventTeamMember } from '../models';
import { Observable } from 'rxjs';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

interface Counts {
  countOfDeposit: number;
  countOfCost: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventTeamsService {
  url = URL + '/event/teams';
  constructor(public http: HttpClient) {}

  getEventTeams(event: number): Promise<EventTeam[]> {
    return this.http.get<EventTeam[]>(`${this.url}/get/${event}`, HttpHeader).toPromise();
  }

  deleteEventTeam(team: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/delete/${team}`, HttpHeader).toPromise();
  }

  updateEventTeam(team: number, name: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { team, name }, HttpHeader).toPromise();
  }

  addEventTeam(event: number, name: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { event, name }, HttpHeader).toPromise();
  }

  setIsPaidFixCostStatus(team: number, status: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/set/cost`, { team, status }, HttpHeader).toPromise();
  }

  setIsPaidFixDepositStatus(team: number, status: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/set/deposit`, { team, status }, HttpHeader).toPromise();
  }

  getCountOFixCostsAndDeposits(event: number): Promise<Counts> {
    return this.http.get<Counts>(`${this.url}/fixcounts/${event}`, HttpHeader).toPromise();
  }

  setHasResponsibilityPaper(team: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/set/responsibility/${team}`, HttpHeader).toPromise();
  }

  setTeamMemberToTeamLeader(team: number, member: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/set/leader/${team}/${member}`, HttpHeader).toPromise();
  }

  getEventTeamMembers(team: number): Promise<EventTeamMember[]> {
    return this.http.get<EventTeamMember[]>(`${this.url}/members/get/${team}`, HttpHeader).toPromise();
  }

  deleteEventTeamMember(member: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/members/delete/${member}`, HttpHeader).toPromise();
  }

  addEventTeamMember(team: number, name: string): Promise<Response> {
    return this.http.post<Response>(`${this.url}/members/add`, { team, name }, HttpHeader).toPromise();
  }

  setDeposit(member: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/members/deposit/${member}`, HttpHeader).toPromise();
  }

  setCost(member: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/members/cost/${member}`, HttpHeader).toPromise();
  }

  countOfCostAndDeposit(event: number): Promise<Counts> {
    return this.http.get<Counts>(`${this.url}/counts/${event}`, HttpHeader).toPromise();
  }

  postFile(fileToUpload: File, event: number): Promise<boolean> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<boolean>(`${this.url}/upload/${event}`, formData, HttpHeader).toPromise();
  }
}
