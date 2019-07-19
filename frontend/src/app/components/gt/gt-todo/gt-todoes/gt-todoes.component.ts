import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtTodo } from 'src/app/models';
import { GtTodoesService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtTodoDialogComponent } from '../gt-todo-dialog/gt-todo-dialog.component';

@Component({
  selector: 'app-gt-todoes',
  templateUrl: './gt-todoes.component.html',
  styleUrls: ['./gt-todoes.component.scss']
})
export class GtTodoesComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  gtTodoes: GtTodo[] = [];
  now = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };

  constructor(
    private gttodoeservice: GtTodoesService,
    private notficationserivce: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getGtTodoes();
  }

  ngOnChanges() {
    this.getGtTodoes();
  }

  getGtTodoes() {
    this.gttodoeservice
      .getGtTodoes(this.gt.id)
      .then(res => {
        this.gtTodoes = res;
      })
      .catch(() => {
        this.gtTodoes = [];
      });
  }

  openTodoDialog(event?) {
    const dialogRef = this.dialog.open(GtTodoDialogComponent, {
      data: event ? event.todo : null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (event) {
          this.gttodoeservice
            .updateGtTodo(result.id, result.text, result.importance, result.expirationDate)
            .then(res => {
              if (res.response === 'success') {
                this.notficationserivce.success(res.message);
                this.getGtTodoes();
              } else {
                this.notficationserivce.error(res.message);
              }
            })
            .catch(() => {
              this.notficationserivce.error('A todo frissítése közben hiba lépett fel. Kérjük próbálja újra késöbb!');
            });
        } else {
          this.gttodoeservice
            .addGtTodo(this.gt.id, result.text, result.importance, result.expirationDate)
            .then(res => {
              if (res.response === 'success') {
                this.notficationserivce.success(res.message);
                this.getGtTodoes();
              } else {
                this.notficationserivce.error(res.message);
              }
            })
            .catch(() => {
              this.notficationserivce.error('A todo létrehozása közben hiba lépett fel. Kérjük próbálja újra késöbb!');
            });
        }
      }
    });
  }
}
