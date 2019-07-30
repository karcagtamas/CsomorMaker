import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  title = '';

  constructor(
    public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: News,
    private notficationservice: NotificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: ['', [Validators.required]]
    });
    this.isEdit = this.data ? true : false;
    if (this.isEdit) {
      this.setValues();
    }
    this.title = this.isEdit ? 'Hír frissítése' : 'Hír létrehozása';
  }

  setValues() {
    this.form.setValue({ text: this.data.text });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notficationservice.warning('Nem megfelelő adat!');
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
