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
  title = '';
  hours: number[] = [];
  startHours: number[] = [];
  endHours: number[] = [];
  days: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<GtWorkDialogComponent>,
    private fb: FormBuilder,
    private notificatinservice: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { work: GtWork; days: number }
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      day: ['', [Validators.required, Validators.min(1)]],
      start: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      end: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      workers: ['', [Validators.required, Validators.min(0)]]
    });
    this.isEdit = this.data.work ? true : false;
    if (this.isEdit) {
      this.setValues();
    }
    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 1; i <= this.data.days; i++) {
      this.days.push(i);
    }
    this.startHours = this.hours;
    this.endHours = this.hours;
    this.title = this.isEdit ? 'Poszt frissítése' : 'Új poszt';
  }

  onNoClick() {
    this.dialogRef.close();
  }

  setValues() {
    this.form.setValue({
      name: this.data.work.name,
      day: this.data.work.day,
      start: this.data.work.startHour,
      end: this.data.work.endHour,
      workers: this.data.work.workerCount
    });
    this.startHours = this.hours.filter(x => x < this.data.work.endHour);
    this.endHours = this.hours.filter(x => x > this.data.work.startHour);
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close({
        name: this.form.get('name').value,
        day: this.form.get('day').value,
        start: this.form.get('start').value,
        end: this.form.get('end').value,
        workers: this.form.get('workers').value
      });
    }
  }

  startChange() {
    this.endHours = this.hours.filter(x => x > this.form.get('start').value);
  }

  endChange() {
    this.startHours = this.hours.filter(x => x < this.form.get('end').value);
  }
}
