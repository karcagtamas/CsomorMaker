import { LoginService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  isLoggedIn = false;
  interval;
  constructor(private loginservice: LoginService) {}

  ngOnInit() {
    this.interval = setInterval(() => {
      this.getIsLoggedIn();
    }, 5000);
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

  logout() {
    this.loginservice
      .logout()
      .then(res => {
        if (res.response === 'logout-success') {
          window.alert('Sikeres kijelentkezés!');
        } else {
          window.alert('Sikertelen kijelentkezés!');
        }
      })
      .catch(() => {
        window.alert('Sikertelen kijelentkezés!');
      });
  }
}
