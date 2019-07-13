import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services';
import { GtWork } from 'src/app/models';

@Component({
  selector: 'app-gt-work-dialog',
  templateUrl: './gt-work-dialog.component.html',
  styleUrls: ['./gt-work-dialog.component.scss']
})
export class GtWorkDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<GtWorkDialogComponent>,
    private fb: FormBuilder,
    private notificatinservice: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { work: GtWork; days: number }
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });
    this.isEdit = this.data ? true : false;
    if (this.isEdit) {
      this.setValues();
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setValues() {
    this.form.setValue({
      name: this.data.work.name,
      day: this.data.work.day,
      start: this.data.work.startHour,
      end: this.data.work.endHour
    });
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close({
        name: this.form.get('name').value,
        day: this.form.get('day').value,
        start: this.form.get('start').value,
        end: this.form.get('end').value
      });
    }
  }
}
