import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventToDo } from 'src/app/models';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  title = '';
  isEdit = false;

  textControl = new FormControl('', [Validators.required]);
  importanceControl = new FormControl('', [Validators.required]);
  dateControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<TodoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EventToDo) {}

  ngOnInit() {
    this.isEdit = this.data ? true : false;
    this.title = this.isEdit ? 'Todo frissítése' : 'Todo létrehozása';
    if (this.isEdit) {
      this.setValues();
    }
  }

  setValues() {
    this.textControl.setValue(this.data.text);
    this.dateControl.setValue(this.data.expirationDate);
    this.importanceControl.setValue(this.data.importance);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (!this.textControl.invalid && !this.importanceControl.invalid && !this.dateControl.invalid) {
      const todo: EventToDo = this.isEdit ? this.data : new EventToDo();
      todo.text = this.textControl.value;
      todo.expirationDate = new Date(this.dateControl.value);
      todo.expirationDate.setHours(10);
      todo.importance = +this.importanceControl.value;
      this.dialogRef.close(todo);
    }
  }
}
