import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-work',
  templateUrl: './add-new-work.component.html',
  styleUrls: ['./add-new-work.component.scss']
})
export class AddNewWorkComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddNewWorkComponent>) {}

  nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

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
