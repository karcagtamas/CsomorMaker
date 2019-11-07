import { LoginService, CommonService, UserService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isMobielView = window.innerWidth < 650;
  constructor(
    private loginservice: LoginService,
    private router: Router,
    private commonservice: CommonService,
    private userserive: UserService
  ) {}

  ngOnInit() {
    this.getIsLoggedIn();
    this.getIsAdmin();
    this.commonservice.changeEmitted$.subscribe(() => {
      this.getIsLoggedIn();
      this.getIsAdmin();
    });
  }

  getIsLoggedIn() {
    this.loginservice
      .isLoggedIn()
      .then(res => {
        this.isLoggedIn = res;
      })
      .catch(() => {
        this.isLoggedIn = false;
      });
  }

  getIsAdmin() {
    this.userserive
      .isAdmin()
      .then(res => {
        this.isAdmin = res;
      })
      .catch(() => {
        this.isAdmin = false;
      });
  }

  logout() {
    this.loginservice
      .logout()
      .then(res => {
        if (res.response === 'success') {
          window.alert(res.message);
          this.router.navigateByUrl('/login');
          this.getIsLoggedIn();
        } else {
          window.alert(res.message);
        }
      })
      .catch(() => {
        window.alert('Sikertelen kijelentkezés!');
      });
  }
}
