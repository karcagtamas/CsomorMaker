import { LoginService } from 'src/app/services';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      this.loginservice
        .isLoggedIn()
        .then(res => {
          if (res) {
            resolve(true);
          } else {
            this.router.navigateByUrl('/login');
            resolve(false);
          }
        })
        .catch(() => resolve(false));
    });
  }
}
