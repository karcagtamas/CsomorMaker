import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(public dialogRef: MatDialogRef<AddTeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (!this.nameControl.invalid) {
      this.dialogRef.close({ name: this.nameControl.value });
    }
  }
}
