import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventPayOutType, EventPayOut } from 'src/app/models';

@Component({
  selector: 'app-new-pay-out-dialog',
  templateUrl: './new-pay-out-dialog.component.html',
  styleUrls: ['./new-pay-out-dialog.component.scss']
})
export class NewPayOutDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewPayOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventPayOutType[]
  ) {}

  nameControl = new FormControl('', [Validators.required, Validators.maxLength(75)]);
  costControl = new FormControl('', [Validators.required, Validators.min(0)]);
  typeControl = new FormControl('', [Validators.required]);

  payOut: EventPayOut = new EventPayOut();

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    this.payOut.cost = +this.costControl.value;
    this.payOut.name = this.nameControl.value;
    this.payOut.typeId = +this.typeControl.value;
    const type = this.data.find(x => x.id === this.payOut.typeId);
    this.payOut.type = type.name;
    this.payOut.isOut = type.isOut;
    this.payOut.id = 0;
    this.payOut.eventId = 0;
    this.dialogRef.close(this.payOut);
  }
}
