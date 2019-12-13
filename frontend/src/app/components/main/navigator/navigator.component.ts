import { LoginService, CommonService, UserService, THEMES, NAVIGATOR_HEADERS } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isMobielView = window.innerWidth < 650;
  user: User = null;

  themes = THEMES;
  navigatorHeaders = NAVIGATOR_HEADERS;

  selectedTheme: string;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private commonservice: CommonService,
    private userserive: UserService
  ) {}

  ngOnInit() {
    this.getIsLoggedIn();
    this.getIsAdmin();
    this.getUser();
    this.commonservice.state$.subscribe(() => {
      if (this.commonservice.isLoggedIn) {
        this.getIsLoggedIn();
        this.getIsAdmin();
        this.getUser();
      }
      if (this.commonservice.selectedTheme) {
        this.selectedTheme = this.commonservice.selectedTheme.clazz;
      }
    });
  }

  getUser(): void {
    this.userserive
      .getId()
      .then(res => {
        this.userserive
          .getUser(res)
          .then(user => {
            this.user = user;
          })
          .catch(() => {
            this.user = null;
          });
      })
      .catch(() => {
        this.user = null;
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

  changeTheme() {
    this.commonservice.selectedTheme = THEMES.find(x => x.clazz === this.selectedTheme);
  }
}
