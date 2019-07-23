import { Component, OnInit } from '@angular/core';
import { LoginService, NotificationService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  reset() {
    if (!this.form.invalid) {
      this.loginservice
        .checkResetDetails(this.form.get('username').value, this.form.get('email').value)
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
    } else {
      this.notificationservice.warning('Nem megfelelő adatok!');
    }
  }
}
