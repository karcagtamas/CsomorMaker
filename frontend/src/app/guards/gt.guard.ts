import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GtService } from '../services';

const MENUITEMS = [
  { name: 'Adatok', link: 'details', accessLevel: 1 },
  { name: 'Beállítások', link: 'settings', accessLevel: 3 },
  { name: 'Generátor', link: 'generator', accessLevel: 3 },
  { name: 'Csömör', link: 'csomor', accessLevel: 1 },
  { name: 'Áttekintés', link: 'summary', accessLevel: 3 },
  { name: 'ToDo', link: 'todo', accessLevel: 2 },
  { name: 'Chat', link: 'chat', accessLevel: 1 },
  { name: 'Tagok', link: 'members', accessLevel: 1 },
  { name: 'Osztályok', link: 'classes', accessLevel: 2 }
];

@Injectable({
  providedIn: 'root'
})
export class GtGuard implements CanActivate {
  constructor(private gtservice: GtService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const gtId = +next.paramMap.get('id');
    const page = next.paramMap.get('page');
    return new Promise(resolve => {
      this.gtservice
        .getAccessLevel(gtId)
        .then(res => {
          const item = MENUITEMS.find(x => x.link === page);
          if (item && res) {
            if (item.accessLevel <= res) {
              resolve(true);
            } else {
              this.router.navigateByUrl(`/gts/${gtId}/details`);
              resolve(false);
            }
          } else {
            this.router.navigateByUrl('/gts');
            resolve(false);
          }
        })
        .catch(err => {
          this.router.navigateByUrl('/gts');
          resolve(false);
        });
    });
  }
}
