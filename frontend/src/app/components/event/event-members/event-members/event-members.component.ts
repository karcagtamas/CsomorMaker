import { AddNewMemberModalComponent } from './../add-new-member-modal/add-new-member-modal.component';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventMember, Event } from 'src/app/models';
import { NotificationService, UserService, EventMembersService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.component.html',
  styleUrls: ['./event-members.component.scss']
})
export class EventMembersComponent implements OnInit, OnChanges {
  @Input() event: Event;
  @Input() accessLevel: number;
  userId = 0;
  filterValue = '';
  eventMembers: EventMember[];
  filteredMembers: EventMember[] = [];

  constructor(
    private eventmembersservice: EventMembersService,
    private notificationservice: NotificationService,
    public dialog: MatDialog,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.getEventMembers();
    this.userservice
      .getId()
      .then(res => {
        this.userId = res;
      })
      .catch(() => {
        this.userId = 0;
      });
  }

  ngOnChanges() {
    this.getEventMembers();
  }

  getEventMembers() {
    this.eventmembersservice
      .getEventMembers(this.event.id)
      .then(res => {
        this.eventMembers = res;
        this.filteredMembers = this.eventMembers;
      })
      .catch(() => {
        this.eventMembers = [];
      });
  }

  deleteEventMember(event) {
    this.eventmembersservice
      .deleteUserFromEvent(event.id, this.event.id)
      .then(res => {
        if (res.response === 'success') {
          this.getEventMembers();
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
    this.eventmembersservice
      .updateEventUser(event.data.id, this.event.id, event.data.roleId)
      .then(res => {
        if (res.response === 'success') {
          this.getEventMembers();
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
    const dialogRef = this.dialog.open(AddNewMemberModalComponent, { data: this.event.id, minWidth: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventmembersservice
          .addUserToEvent(result, this.event.id)
          .then(res => {
            if (res.response === 'success') {
              this.getEventMembers();
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
  filter() {
    this.filteredMembers = this.eventMembers.filter(x => x.name.toLowerCase().includes(this.filterValue.toLowerCase()));
  }
}
