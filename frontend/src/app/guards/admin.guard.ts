import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userservice: UserService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.userservice
        .isAdmin()
        .then(res => {
          console.log(res);
          if (res) {
            resolve(true);
          } else {
            // this.router.navigateByUrl('/login');
            resolve(false);
          }
        })
        .catch(() => resolve(false));
    });
  }
}
