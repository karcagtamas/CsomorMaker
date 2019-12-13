import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { INavigatorHeader, Theme, RooState } from '../models';

export const THEMES: Theme[] = [
  { clazz: 'purple-theme', name: 'Lila' },
  { clazz: 'dark-theme', name: 'Sötét Lila' }
];

export const NAVIGATOR_HEADERS: INavigatorHeader[] = [
  { name: 'Login', title: 'Bejelentkezés', route: '/login', subHeaders: [], accessLevel: 0 },
  { name: 'Registration', title: 'Regisztráció', route: '/registraton', subHeaders: [], accessLevel: 0 },
  {
    name: 'Profile',
    title: 'Profil',
    route: null,
    subHeaders: [{ name: 'MyProfile', title: 'Profilom', route: '/my-profile', subHeaders: [], accessLevel: 1 }],
    accessLevel: 1
  },
  {
    name: 'Events',
    title: 'Események',
    route: null,
    subHeaders: [
      { name: 'NewEvent', title: 'Új esemény', route: '/new-event', subHeaders: [], accessLevel: 1 },
      { name: 'MyEvents', title: 'Eseményeim', route: '/events', subHeaders: [], accessLevel: 1 }
    ],
    accessLevel: 1
  },
  {
    name: 'Gts',
    title: 'Gólyatáborok',
    route: null,
    subHeaders: [
      { name: 'NewGt', title: 'Új gólyatábor', route: '/new-gt', subHeaders: [], accessLevel: 1 },
      { name: 'MyGts', title: 'Gólyatáboraim', route: '/gts', subHeaders: [], accessLevel: 1 }
    ],
    accessLevel: 1
  },
  {
    name: 'Admin',
    title: 'Admin',
    route: null,
    subHeaders: [
      { name: 'UserAdmin', title: 'Felhasználókezekelés', route: '/user-admin', subHeaders: [], accessLevel: 3 },
      { name: 'EventAdmin', title: 'Eseménykezelés', route: '/event-admin', subHeaders: [], accessLevel: 3 },
      { name: 'GtAdmin', title: 'Gólyatábor-kezelés', route: '/gt-admin', subHeaders: [], accessLevel: 3 }
    ],
    accessLevel: 3
  }
];

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor() {}

  private readonly _state = new BehaviorSubject<RooState>({ selectedTheme: THEMES[0], isLoggedIn: false });

  readonly state$ = this._state.asObservable();

  get selectedTheme(): Theme {
    return this._state.getValue().selectedTheme;
  }

  set selectedTheme(val: Theme) {
    const state: RooState = this._state.getValue();
    state.selectedTheme = val;
    this._state.next(state);
    localStorage.setItem('theme', val.clazz);
  }

  get isLoggedIn(): boolean {
    return this._state.getValue().isLoggedIn;
  }

  set isLoggedIn(val: boolean) {
    const state: RooState = this._state.getValue();
    state.isLoggedIn = val;
    this._state.next(state);
  }
}
