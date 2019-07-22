import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GtTodo } from 'src/app/models';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-todo-dialog',
  templateUrl: './gt-todo-dialog.component.html',
  styleUrls: ['./gt-todo-dialog.component.scss']
})
export class GtTodoDialogComponent implements OnInit {
  title = '';
  isEdit = false;

  form: FormGroup;

  constructor(
    private notificationservice: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GtTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GtTodo
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      text: ['', Validators.required],
      importance: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.isEdit = this.data ? true : false;
    this.title = this.isEdit ? 'Todo frissítése' : 'Todo létrehozása';
    if (this.isEdit) {
      this.setValues();
    }
  }

  setValues() {
    this.form.setValue({ text: this.data.text, date: this.data.expirationDate, importance: this.data.importance });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificationservice.warning('Nem megfelelő adatok!');
    } else {
      const todo: GtTodo = this.isEdit ? this.data : new GtTodo();
      todo.text = this.form.get('text').value;
      todo.expirationDate = new Date(this.form.get('date').value);
      todo.expirationDate.setHours(10);
      todo.importance = +this.form.get('importance').value;
      this.dialogRef.close(todo);
    }
  }
}
