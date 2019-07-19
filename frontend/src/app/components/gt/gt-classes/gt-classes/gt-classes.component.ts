import { GtClassesService, NotificationService } from 'src/app/services';
import { Gt, GtClass } from 'src/app/models';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GtClassDialogComponent } from '../gt-class-dialog/gt-class-dialog.component';

@Component({
  selector: 'app-gt-classes',
  templateUrl: './gt-classes.component.html',
  styleUrls: ['./gt-classes.component.scss']
})
export class GtClassesComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  gtClasses: GtClass[] = [];

  constructor(
    private gtclassesservice: GtClassesService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getClasses();
  }

  ngOnChanges() {
    this.getClasses();
  }

  getClasses() {
    this.gtclassesservice
      .getGtClasses(this.gt.id)
      .then(res => {
        this.gtClasses = res;
      })
      .catch(() => (this.gtClasses = []));
  }

  openClassDialog(event?) {
    const dialogRef = this.dialog.open(GtClassDialogComponent, {
      data: event ? event.class : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!event) {
          this.gtclassesservice
            .addGtClass(this.gt.id, result.name)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getClasses();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error(
                'Az osztály létrehozása közben hiba történt! Kérjük próbálja újra késöbb!'
              );
            });
        } else {
          this.gtclassesservice
            .updateGtClass(result.id, result.name, result.tShirtColor)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getClasses();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('Az osztály frissítése közben hiba történt! Kérjük próbálja újra késöbb!');
            });
        }
      }
    });
  }
}
