import { Component, OnInit } from '@angular/core';
import { LoginService, CommonService, NotificationService } from 'src/app/services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private commonservice: CommonService,
    private fb: FormBuilder,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  }

  login() {
    if (!this.form.invalid) {
      this.loginservice
        .login(this.form.get('username').value, this.form.get('password').value)
        .then(res => {
          if (res.response === 'success') {
            this.commonservice.isLoggedIn = true;
            this.router.navigateByUrl('/home');
          } else {
            this.notificationservice.error(res.message);
          }
        })
        .catch(err => {
          this.notificationservice.error(
            'Valamilyen hiba lépett fel a kommunikáció során, kérem próbálja újra később!'
          );
        });
    } else {
      this.notificationservice.warning('Nem megfelelő adatok!');
    }
  }
}
