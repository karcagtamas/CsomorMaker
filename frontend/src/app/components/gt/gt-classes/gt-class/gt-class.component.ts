import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { GtClass, GtClassMember } from 'src/app/models';
import { GtClassesService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-class',
  templateUrl: './gt-class.component.html',
  styleUrls: ['./gt-class.component.scss']
})
export class GtClassComponent implements OnInit, OnChanges {
  @Input() gtClass: GtClass;
  @Output() update = new EventEmitter();
  @Output() refresh = new EventEmitter();
  gtClassMembers: GtClassMember[] = [];

  constructor(
    private gtclassesservice: GtClassesService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getGtClassMembers();
  }

  ngOnChanges() {
    this.getGtClassMembers();
  }

  getGtClassMembers() {
    this.gtclassesservice
      .getGtClassMembers(this.gtClass.id)
      .then(res => {
        this.gtClassMembers = res;
      })
      .catch(() => {
        this.gtClassMembers = [];
      });
  }

  updateClass() {
    this.update.emit({ class: this.gtClass });
  }

  deleteClass() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Osztály törlése', name: this.gtClass.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtclassesservice
          .deleteGtClass(this.gtClass.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.refresh.emit();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('Az osztály törlése közbe hiba történ! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }
}
