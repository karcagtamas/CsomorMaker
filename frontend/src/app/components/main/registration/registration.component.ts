import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      rePassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]]
    });
  }

  reg() {
    if (this.form.invalid) {
      this.notificationservice.warning('Nem megfelelő adatok!');
    } else if (this.form.get('password').value !== this.form.get('rePassword').value) {
      this.notificationservice.warning('A két megadott jelszó nem egyezik!');
    } else {
      this.loginservice
        .registration(this.form.get('username').value, this.form.get('email').value, this.form.get('password').value)
        .then(res => {
          if (res.response === 'success') {
            this.notificationservice.success(res.message);
          } else {
            this.notificationservice.error(res.message);
          }
        })
        .catch(err => {
          this.notificationservice.error(
            'Valamilyen hiba lépett fel a kommunikáció során, kérem próbálja újra később!'
          );
        });
    }
  }
}
