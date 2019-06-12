import { LoginService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  constructor(private loginservice: LoginService) {}

  ngOnInit() {}

  logout() {
    this.loginservice
      .logout()
      .then(res => {})
      .catch(err => {});
  }
}
