import { Component, OnInit, Inject } from '@angular/core';
import { GtPayout, EventPayOutType } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService, GtPayoutsService } from 'src/app/services';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-payout-dialog',
  templateUrl: './gt-payout-dialog.component.html',
  styleUrls: ['./gt-payout-dialog.component.scss']
})
export class GtPayoutDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<GtPayoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payOutTypes: EventPayOutType[]; payOut: GtPayout },
    private fb: FormBuilder,
    private notficationservice: NotificationService,
    public dialog: MatDialog,
    private gtpayoutservice: GtPayoutsService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(75)]],
      cost: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
      from: ['', [Validators.required, Validators.maxLength(50)]],
      to: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.isEdit = this.data.payOut ? true : false;
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Kifizetés / Befizetés frissítése' : 'Új Kifizetés / Befizetés';
  }

  setValues() {
    const payout = this.data.payOut;
    this.form.setValue({ name: payout.name, type: payout.typeId, cost: payout.cost, from: payout.from, to: payout.to });
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
        type: +this.form.get('type').value,
        from: this.form.get('from').value,
        to: this.form.get('to').value
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
        this.gtpayoutservice
          .deleteGtPayout(this.data.payOut.id)
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
