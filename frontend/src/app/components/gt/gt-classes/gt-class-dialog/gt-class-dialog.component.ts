import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GtClass } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-class-dialog',
  templateUrl: './gt-class-dialog.component.html',
  styleUrls: ['./gt-class-dialog.component.scss']
})
export class GtClassDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<GtClassDialogComponent>,
    private fb: FormBuilder,
    private notificatinservice: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: GtClass
  ) {}

  ngOnInit() {
    this.isEdit = this.data ? true : false;
    let form;
    if (this.isEdit) {
      form = {
        name: ['', [Validators.required, Validators.maxLength(5)]],
        tShirtColor: ['', [Validators.required, Validators.maxLength(50)]]
      };
    } else {
      form = { name: ['', [Validators.required, Validators.maxLength(5)]] };
    }
    this.form = this.fb.group(form);
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Osztály frissítése' : 'Új osztály';
  }

  setValues() {
    this.form.setValue({ name: this.data.name, tShirtColor: this.data.tShirtColor });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      let form;
      if (this.isEdit) {
        form = { id: this.data.id, name: this.form.get('name').value, tShirtColor: this.form.get('tShirtColor').value };
      } else {
        form = { name: this.form.get('name').value };
      }
      this.dialogRef.close(form);
    }
  }
}
