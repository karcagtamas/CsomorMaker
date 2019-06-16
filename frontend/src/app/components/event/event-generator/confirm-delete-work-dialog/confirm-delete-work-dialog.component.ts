import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventWork } from 'src/app/models';

@Component({
  selector: 'app-confirm-delete-work-dialog',
  templateUrl: './confirm-delete-work-dialog.component.html',
  styleUrls: ['./confirm-delete-work-dialog.component.scss']
})
export class ConfirmDeleteWorkDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteWorkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventWork
  ) {}

  ngOnInit() {}
}
