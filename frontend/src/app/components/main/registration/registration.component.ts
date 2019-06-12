import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  alert = '';
  success = false;
  usernameControl = new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
  rePasswordControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]);
  emailControl = new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email]);

  constructor(private loginservice: LoginService) {}

  ngOnInit() {}

  reg() {
    if (
      this.usernameControl.invalid ||
      this.passwordControl.invalid ||
      this.rePasswordControl.invalid ||
      this.emailControl.invalid
    ) {
      this.setAlert('Nem megfelelő adatok!', false);
    } else if (this.passwordControl.value !== this.rePasswordControl.value) {
      this.setAlert('A két megadott jelszó nem egyezik!', false);
    } else {
      this.loginservice
        .registration(this.usernameControl.value, this.emailControl.value, this.passwordControl.value)
        .then(res => {
          if (res.response === 'reg-success') {
            this.setAlert('Sikeres regisztráció!', true);
          } else {
            this.setAlert(res.message, false);
          }
        })
        .catch(err => {
          this.setAlert('Valamilyen hiba lépett fel a kommunikáció során, kérem próbálja újra kéőbb!', false);
        });
    }
  }

  setAlert(value: string, isSuccess: boolean) {
    this.alert = value;
    this.success = isSuccess;
    setTimeout(() => {
      this.alert = '';
    }, 3000);
  }
}
