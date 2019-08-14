import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GtService } from '../services';

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
    const menuItems = this.gtservice.menuItems;
    return new Promise(resolve => {
      this.gtservice
        .getAccessLevel(gtId)
        .then(res => {
          const item = menuItems.find(x => x.link === page);
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
