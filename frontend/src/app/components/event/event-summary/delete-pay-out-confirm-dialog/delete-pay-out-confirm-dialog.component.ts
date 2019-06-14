import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventPayOut } from 'src/app/models';

@Component({
  selector: 'app-delete-pay-out-confirm-dialog',
  templateUrl: './delete-pay-out-confirm-dialog.component.html',
  styleUrls: ['./delete-pay-out-confirm-dialog.component.scss']
})
export class DeletePayOutConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePayOutConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventPayOut
  ) {}

  ngOnInit() {}
}
