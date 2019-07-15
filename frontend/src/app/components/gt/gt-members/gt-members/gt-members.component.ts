import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtMember } from 'src/app/models';
import { GtMembersService } from 'src/app/services/gt-members.service';
import { NotificationService, UserService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtAddMemberDialogComponent } from '../gt-add-member-dialog/gt-add-member-dialog.component';

@Component({
  selector: 'app-gt-members',
  templateUrl: './gt-members.component.html',
  styleUrls: ['./gt-members.component.scss']
})
export class GtMembersComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  @Input() accessLevel: number;
  userId = 0;
  filterValue = '';
  gtMembers: GtMember[] = [];

  constructor(
    private gtmembersservice: GtMembersService,
    private notificationservice: NotificationService,
    public dialog: MatDialog,
    public userservice: UserService
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
    const dialogRef = this.dialog.open(GtAddMemberDialogComponent, { data: this.gt.id });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtmembersservice
          .addGtMember(this.gt.id, result.user)
          .then(res => {
            if (res.response === 'success') {
              this.getGtMembers();
              this.notificationservice.success(res.message);
            } else {
              this.notificationservice.error(res.response);
            }
          })
          .catch(() => {
            this.notificationservice.error('A tag hozzáadása közben hiba történt. Kérjük próbálja újra késübb.');
          });
      }
    });
  }

  filter() {}
}
