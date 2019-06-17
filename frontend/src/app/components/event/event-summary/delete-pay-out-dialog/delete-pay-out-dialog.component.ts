import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { EventPayOut } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-delete-pay-out-dialog',
  templateUrl: './delete-pay-out-dialog.component.html',
  styleUrls: ['./delete-pay-out-dialog.component.scss']
})
export class DeletePayOutDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePayOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventPayOut[],
    public dialog: MatDialog
  ) {}

  payoutControl = new FormControl('', [Validators.required]);

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    const payout = this.data.find(x => x.id === +this.payoutControl.value);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Ki/Befizetés törlése', name: payout.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.payoutControl.setValue(0);
      }
      this.dialogRef.close(this.payoutControl.value);
    });
  }
}
