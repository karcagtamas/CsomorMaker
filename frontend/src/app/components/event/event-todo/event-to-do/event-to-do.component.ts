import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Event, EventToDo } from 'src/app/models';
import { EventTodoesService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-event-to-do',
  templateUrl: './event-to-do.component.html',
  styleUrls: ['./event-to-do.component.scss']
})
export class EventToDoComponent implements OnInit, OnChanges {
  @Input() event: Event;
  eventTodoes: EventToDo[] = [];
  now = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };

  constructor(
    private eventtodoservice: EventTodoesService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getEventTodoes();
  }

  ngOnChanges() {
    this.getEventTodoes();
  }

  getEventTodoes() {
    this.eventtodoservice
      .getEventTodoes(this.event.id)
      .then(res => {
        this.eventTodoes = res;
      })
      .catch(() => {
        this.eventTodoes = [];
      });
  }

  isToday(todo: EventToDo) {
    const date = new Date(todo.expirationDate);
    if (date.getFullYear() <= this.now.year && date.getMonth() <= this.now.month && date.getDate() <= this.now.day) {
      return true;
    }
    return false;
  }

  openDialog(todo?: EventToDo) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: todo ? todo : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo) {
          this.eventtodoservice
            .updateEventTodo(todo.id, result.text, result.importance, result.expirationDate)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getEventTodoes();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A todo frissítése közben hiba lépett fel. Kérjük próbálja újra késöbb.');
            });
        } else {
          this.eventtodoservice
            .addEventTodo(this.event.id, result.text, result.importance, result.expirationDate)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getEventTodoes();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A todo hozzáadása közben hiba lépett fel. Kérjük próbálja újra késöbb.');
            });
        }
      }
    });
  }

  setToSolved(todo: EventToDo) {
    this.eventtodoservice
      .setSolvedTodo(todo.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A todo megoldottál állítása közbe hiba történt. Kérjük próbálja újra késöbb!');
      });
  }
}
