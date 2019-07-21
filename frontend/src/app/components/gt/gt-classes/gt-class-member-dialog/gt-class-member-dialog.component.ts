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
    this.form = this.fb.group({ name: ['', Validators.required], description: [''] });
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Osztály tag frissítése' : 'Új osztály tag';
  }

  setValues() {
    this.form.setValue({ name: this.data.name, description: this.data.description });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close({ name: this.form.get('name').value, description: this.form.get('description').value });
    }
  }
}
