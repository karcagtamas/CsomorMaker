import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  alert = '';
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(private loginservice: LoginService, private router: Router) {}
  ngOnInit() {}

  login() {
    if (!this.passwordControl.invalid && !this.usernameControl.invalid) {
      this.loginservice
        .login(this.usernameControl.value, this.passwordControl.value)
        .then(res => {
          if (res.response === 'valid-login') {
            this.router.navigateByUrl('/home');
          } else {
            this.setAlert(res.message, false);
          }
        })
        .catch(err => {
          console.log(err);
          this.setAlert('Nem megfelelő adatok!', false);
        });
    } else {
      this.setAlert('Valamilyen hiba lépett fel a kommunikáció során, kérem próbálja újra kéőbb!', false);
    }
  }

  setAlert(value: string, isSuccess: boolean) {
    this.alert = value;
    setTimeout(() => {
      this.alert = '';
    }, 3000);
  }
}
