import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService, UserService } from 'src/app/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private notificationservice: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      old: ['', [Validators.required, Validators.maxLength(50)]],
      new: ['', [Validators.required, Validators.maxLength(50)]],
      reNew: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    const passwords = {
      old: this.form.get('old').value,
      new: this.form.get('new').value,
      reNew: this.form.get('reNew').value
    };
    if (this.form.invalid) {
      this.notificationservice.warning('Nem megfelelő adatok!');
    } else if (passwords.old === passwords.new || passwords.old === passwords.reNew) {
      this.notificationservice.warning('A régi és az új jelszó nem egyezhetnek meg!');
    } else if (passwords.new !== passwords.reNew) {
      this.notificationservice.warning('A jelszó és a megerősítés nem egyezik meg!');
    } else {
      this.userservice.checkPassword(this.data.id, passwords.old).then(res => {
        if (res.response === 'success') {
          this.dialogRef.close({ password: passwords.new });
        } else {
          this.notificationservice.warning('A régi jelszó nem megfelelő!');
        }
      });
    }
  }
}
