import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gt-import-members-dialog',
  templateUrl: './gt-import-members-dialog.component.html',
  styleUrls: ['./gt-import-members-dialog.component.scss']
})
export class GtImportMembersDialogComponent implements OnInit {
  file: any;
  value: string;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<GtImportMembersDialogComponent>) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files.item(0);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.file = file;
        this.value = reader.result.toString().split(',')[1];
        console.log(reader.result.toString().split(',')[1]);
      };
    }
  }

  onSubmit() {
    if (this.file) {
      this.dialogRef.close({ file: this.file, value: this.value });
    }
  }
}
