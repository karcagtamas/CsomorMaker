import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtMember } from 'src/app/models';
import { GtMembersService } from 'src/app/services/gt-members.service';
import { NotificationService, UserService, ExportService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtAddMemberDialogComponent } from '../gt-add-member-dialog/gt-add-member-dialog.component';
import { GtImportMembersDialogComponent } from '../gt-import-members-dialog/gt-import-members-dialog.component';

@Component({
  selector: 'app-gt-members',
  templateUrl: './gt-members.component.html',
  styleUrls: ['./gt-members.component.scss']
})
export class GtMembersComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  @Input() accessLevel = 0;
  userId = 0;
  filterValue = '';
  gtMembers: GtMember[] = [];
  filteredMembers: GtMember[] = [];

  constructor(
    private gtmembersservice: GtMembersService,
    private notificationservice: NotificationService,
    public dialog: MatDialog,
    public userservice: UserService,
    private exportservice: ExportService
  ) {}

  ngOnInit() {
    this.getGtMembers();
    this.getUserId();
  }

  ngOnChanges() {
    this.getGtMembers();
  }

  getUserId() {
    this.userservice
      .getId()
      .then(res => {
        this.userId = res;
      })
      .catch(() => {
        this.userId = 0;
      });
  }

  getGtMembers() {
    this.gtmembersservice
      .getGtMembers(this.gt.id)
      .then(res => {
        this.gtMembers = res;
        this.filteredMembers = this.gtMembers;
      })
      .catch(() => {
        this.gtMembers = [];
      });
  }

  deleteGtMember(event) {
    this.gtmembersservice
      .deleteGtMember(this.gt.id, event.id)
      .then(res => {
        if (res.response === 'success') {
          this.getGtMembers();
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A tag törlés közben hiba lépett fel. Kérjük próbálja újra késöbb.');
      });
  }

  updateEventMember(event) {
    this.gtmembersservice
      .updateGtMember(this.gt.id, event.user, event.role)
      .then(res => {
        if (res.response === 'success') {
          this.getGtMembers();
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'A tag rangjának frissítése közben hiba lépett fel. Kérjük próbálja újra késöbb.'
        );
      });
  }

  openAddMemberModal() {
    const dialogRef = this.dialog.open(GtAddMemberDialogComponent, { data: this.gt.id, minWidth: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtmembersservice
          .addGtMember(this.gt.id, result.user)
          .then(res => {
            if (res.response === 'success') {
              this.getGtMembers();
              this.notificationservice.success(res.message);
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A tag hozzáadása közben hiba történt. Kérjük próbálja újra késübb.');
          });
      }
    });
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(GtImportMembersDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtmembersservice
          .importGtMembers(this.gt.id, result.file, result.value)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A tagok importálása közben hiba történt. Kérjük próbálja újra késübb.');
          });
      }
    });
  }
  export() {
    this.exportservice.exportGtMembers(this.gt);
  }

  filter() {
    this.filteredMembers = this.gtMembers.filter(x => x.user.toLowerCase().includes(this.filterValue.toLowerCase()));
  }
}
