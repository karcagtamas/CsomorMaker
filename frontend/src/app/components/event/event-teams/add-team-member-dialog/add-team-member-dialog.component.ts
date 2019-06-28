import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-team-member-dialog',
  templateUrl: './add-team-member-dialog.component.html',
  styleUrls: ['./add-team-member-dialog.component.scss']
})
export class AddTeamMemberDialogComponent implements OnInit {
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(public dialogRef: MatDialogRef<AddTeamMemberDialogComponent>) {}

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
