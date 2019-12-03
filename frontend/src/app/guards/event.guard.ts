import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from '../services';

const MENUITEMS = [
  { name: 'Adatok', link: 'details', accessLevel: 1 },
  { name: 'Beállítások', link: 'settings', accessLevel: 3 },
  { name: 'Generátor', link: 'generator', accessLevel: 3 },
  { name: 'Csömör', link: 'csomor', accessLevel: 1 },
  { name: 'Áttekintés', link: 'summary', accessLevel: 3 },
  { name: 'ToDo', link: 'todo', accessLevel: 2 },
  { name: 'Chat', link: 'chat', accessLevel: 1 },
  { name: 'Tagok', link: 'members', accessLevel: 1 },
  { name: 'Csapatok', link: 'teams', accessLevel: 2 },
  { name: 'Rangok', link: 'roles', accessLevel: 3 }
];

@Injectable({
  providedIn: 'root'
})
export class EventGuard implements CanActivate {
  constructor(private eventservice: EventService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const eventId = +next.paramMap.get('id');
    const page = next.paramMap.get('page');
    return new Promise(resolve => {
      this.eventservice
        .getEventAccessLevel(eventId)
        .then(res => {
          const item = MENUITEMS.find(x => x.link === page);
          if (item && res) {
            if (item.accessLevel <= res) {
              resolve(true);
            } else {
              this.router.navigateByUrl(`/events/${eventId}/details`);
              resolve(false);
            }
          } else {
            this.router.navigateByUrl('/events');
            resolve(false);
          }
        })
        .catch(err => {
          this.router.navigateByUrl('/events');
          resolve(false);
        });
    });
  }
}
