import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services';
import { GtClassMember } from 'src/app/models';

@Component({
  selector: 'app-gt-class-member-dialog',
  templateUrl: './gt-class-member-dialog.component.html',
  styleUrls: ['./gt-class-member-dialog.component.scss']
})
export class GtClassMemberDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<GtClassMemberDialogComponent>,
    private fb: FormBuilder,
    private notificatinservice: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: GtClassMember
  ) {}

  ngOnInit() {
    this.isEdit = this.data ? true : false;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      allergy: [''],
      tShirtSize: ['']
    });
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Osztály tag frissítése' : 'Új osztály tag';
  }

  setValues() {
    this.form.setValue({
      name: this.data.name,
      description: this.data.description,
      allergy: this.data.allergy,
      tShirtSize: this.data.tShirtSize
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
