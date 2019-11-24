import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface Theme {
  clazz: string;
  name: string;
}
interface RooState {
  isLoggedIn: boolean;
  selectedTheme: Theme;
}

export const THEMES: Theme[] = [
  { clazz: 'purple-theme', name: 'Lila' },
  { clazz: 'other-theme', name: 'Más' }
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
