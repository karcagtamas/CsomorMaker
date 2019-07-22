import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-modify-dialog',
  templateUrl: './user-modify-dialog.component.html',
  styleUrls: ['./user-modify-dialog.component.scss']
})
export class UserModifyDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private notificationservice: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.form.setValue({ name: this.data.name });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificationservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close({ name: this.form.get('name').value });
    }
  }
}
