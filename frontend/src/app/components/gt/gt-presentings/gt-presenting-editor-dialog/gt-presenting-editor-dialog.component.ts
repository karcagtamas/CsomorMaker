import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GtPresenting } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gt-presenting-editor-dialog',
  templateUrl: './gt-presenting-editor-dialog.component.html',
  styleUrls: ['./gt-presenting-editor-dialog.component.scss']
})
export class GtPresentingEditorDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GtPresentingEditorDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: GtPresenting
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ answer: [''] });
    this.form.setValue({ answer: this.data.answer });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
