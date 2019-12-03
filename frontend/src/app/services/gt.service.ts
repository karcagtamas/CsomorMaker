import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gt, Response, GtRole } from '../models';
import { HttpClient } from '@angular/common/http';

const URL = environment.api;

const HttpHeader = { withCredentials: true };

@Injectable({
  providedIn: 'root'
})
export class GtService {
  url = URL + '/gt';

  menuItems = [
    { name: 'Adatok', link: 'details', accessLevel: 1 },
    { name: 'Beállítások', link: 'settings', accessLevel: 3 },
    { name: 'Generátor', link: 'generator', accessLevel: 3 },
    { name: 'Csömör', link: 'csomor', accessLevel: 1 },
    { name: 'Áttekintés', link: 'summary', accessLevel: 3 },
    { name: 'ToDo', link: 'todo', accessLevel: 2 },
    { name: 'Chat', link: 'chat', accessLevel: 1 },
    { name: 'Tagok', link: 'members', accessLevel: 1 },
    { name: 'Osztályok', link: 'classes', accessLevel: 2 },
    { name: 'Gyűlések', link: 'meetings', accessLevel: 3 },
    { name: 'Bemutatás', link: 'presentings', accessLevel: 1 },
    { name: 'Bemutatás beállítások', link: 'presentings-settings', accessLevel: 3 },
    { name: 'Kérdések', link: 'questions', accessLevel: 3 },
    { name: 'Válaszok', link: 'answers', accessLevel: 3 }
  ];

  constructor(private http: HttpClient) {}

  getGts(): Promise<Gt[]> {
    return this.http.get<Gt[]>(`${this.url}/get`, HttpHeader).toPromise();
  }

  updateGt(gt: Gt): Promise<Response> {
    return this.http.post<Response>(`${this.url}/update`, { gt }, HttpHeader).toPromise();
  }

  addGt(year: number): Promise<Response> {
    return this.http.post<Response>(`${this.url}/add`, { year }, HttpHeader).toPromise();
  }

  getAccessLevel(gt: number): Promise<number> {
    return this.http.get<number>(`${this.url}/accesslevel/${gt}`, HttpHeader).toPromise();
  }

  lockGt(gt: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/lock/${gt}`, HttpHeader).toPromise();
  }

  generate(gt: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/generate/${gt}`, HttpHeader).toPromise();
  }

  countOfAllPaid(gt: number): Promise<{ countOfCosts: number }> {
    return this.http.get<{ countOfCosts: number }>(`${this.url}/costs/${gt}`, HttpHeader).toPromise();
  }

  getGtRoles(id: number): Promise<GtRole[]> {
    return this.http.get<GtRole[]>(`${this.url}/roles/get/${id}`, HttpHeader).toPromise();
  }

  addGtRole(gt: number, name: string, accessLevel: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/roles/add`, { gt, name, accessLevel }, HttpHeader).toPromise();
  }

  updateGtRole(id: number, name: string, accessLevel: boolean): Promise<Response> {
    return this.http.post<Response>(`${this.url}/roles/update`, { id, name, accessLevel }, HttpHeader).toPromise();
  }

  deleteGtRole(id: number): Promise<Response> {
    return this.http.get<Response>(`${this.url}/roles/delete/${id}`, HttpHeader).toPromise();
  }
}
