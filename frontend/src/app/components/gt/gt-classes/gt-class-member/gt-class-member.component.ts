import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GtClassMember } from 'src/app/models';
import { NotificationService, GtClassesService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-class-member',
  templateUrl: './gt-class-member.component.html',
  styleUrls: ['./gt-class-member.component.scss']
})
export class GtClassMemberComponent implements OnInit {
  @Input() gtClassMember: GtClassMember;
  @Output() update = new EventEmitter();
  @Output() refresh = new EventEmitter();

  constructor(
    private notificationservice: NotificationService,
    public dialog: MatDialog,
    private gtclassesservice: GtClassesService
  ) {}

  ngOnInit() {}

  updateMember() {
    this.update.emit({ member: this.gtClassMember });
  }

  deleteMember() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Osztály törlése', name: this.gtClassMember.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtclassesservice
          .deleteGtClass(this.gtClassMember.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.refresh.emit();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('Az osztály tag törlése közbe hiba történ! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }

  setIsPaid() {
    this.gtclassesservice
      .setGtClassMemberPaidStatus(this.gtClassMember.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'Az osztály tag fizetés státuszának állítása közbe hiba történt! Kérjük próbálja újra klsöbb!'
        );
      });
  }
}
