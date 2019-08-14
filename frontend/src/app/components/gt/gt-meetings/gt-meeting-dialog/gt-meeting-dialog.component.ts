import { Component, OnInit, Inject } from '@angular/core';
import { GtMeeting } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-meeting-dialog',
  templateUrl: './gt-meeting-dialog.component.html',
  styleUrls: ['./gt-meeting-dialog.component.scss']
})
export class GtMeetingDialogComponent implements OnInit {
  form: FormGroup;
  title = '';
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<GtMeetingDialogComponent>,
    private fb: FormBuilder,
    private notificatinservice: NotificationService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: GtMeeting
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ date: ['', [Validators.required]] });
    this.isEdit = this.data ? true : false;
    this.title = this.isEdit ? 'Gyűlés frissítése' : 'Új gyűlés';
    if (this.isEdit) {
      this.form.setValue({ date: this.data.date });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      const date: Date = new Date(this.form.get('date').value);
      date.setHours(10);
      this.dialogRef.close({
        date
      });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Gyűlés törlése', name: this.data.date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true });
      }
    });
  }
}
