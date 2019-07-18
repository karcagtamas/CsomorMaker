import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GtTodo } from 'src/app/models';
import { GtTodoesService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-todo',
  templateUrl: './gt-todo.component.html',
  styleUrls: ['./gt-todo.component.scss']
})
export class GtTodoComponent implements OnInit {
  @Input() todo: GtTodo;
  @Input() now: { year: number; month: number; day: number };
  @Output() update = new EventEmitter();
  @Output() refresh = new EventEmitter();
  isNow = false;

  constructor(private gttodoesserivce: GtTodoesService, private notificationservice: NotificationService) {}

  ngOnInit() {
    this.isToday();
  }

  setToSolved() {
    this.gttodoesserivce
      .setSolvedGtTodo(this.todo.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          this.refresh.emit();
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A todo megoldottál állítása közbe hiba történt. Kérjük próbálja újra késöbb!');
      });
  }

  openDialog() {
    this.update.emit({ todo: this.todo });
  }

  isToday() {
    const date = new Date(this.todo.expirationDate);
    if (date.getFullYear() <= this.now.year && date.getMonth() <= this.now.month && date.getDate() <= this.now.day) {
      this.isNow = true;
    } else {
      this.isNow = false;
    }
  }
}
