import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventPayOutType, EventPayOut } from 'src/app/models';
import { NotificationService, EventPayOutsService } from 'src/app/services';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event-payout-dialog',
  templateUrl: './event-payout-dialog.component.html',
  styleUrls: ['./event-payout-dialog.component.scss']
})
export class EventPayoutDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<EventPayoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payOutTypes: EventPayOutType[]; payOut: EventPayOut },
    private fb: FormBuilder,
    private notficationservice: NotificationService,
    public dialog: MatDialog,
    private eventpayoutsservice: EventPayOutsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(75)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
      source: ['', [Validators.required, Validators.maxLength(100)]],
      destination: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.isEdit = this.data.payOut ? true : false;
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Kifizetés / Befizetés frissítése' : 'Új Kifizetés / Befizetés';
  }

  setValues() {
    const payout = this.data.payOut;
    this.form.setValue({
      name: payout.name,
      type: payout.typeId,
      cost: payout.cost,
      source: payout.source,
      destination: payout.destination
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notficationservice.warning('Nem megfelelő adatok!');
    } else {
      // tslint:disable-next-line: prefer-const
      let payout = {
        name: this.form.get('name').value,
        cost: +this.form.get('cost').value,
        typeId: +this.form.get('type').value,
        source: this.form.get('source').value,
        destination: this.form.get('destination').value
      };

      this.dialogRef.close(payout);
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Kifizetés/Befizetés törlése', name: this.data.payOut.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventpayoutsservice
          .deletePayout(this.data.payOut.id)
          .then(res => {
            if (res.response === 'success') {
              this.notficationservice.success(res.message);
              this.dialogRef.close({ refresh: true });
            } else {
              this.notficationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notficationservice.error(
              'A kifizetés/befizetés törlése közben hiba lépett fel! Kérjül próbálja meg újra!'
            );
          });
      }
    });
  }
}
