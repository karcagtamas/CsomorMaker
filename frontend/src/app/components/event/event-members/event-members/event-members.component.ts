import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { EventMember, Event } from 'src/app/models';
import { EventService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.component.html',
  styleUrls: ['./event-members.component.scss']
})
export class EventMembersComponent implements OnInit, OnChanges {
  @Input() event: Event;
  filterValue = '';
  eventMembers: EventMember[];

  constructor(private eventservice: EventService, private notificationservice: NotificationService) {}

  ngOnInit() {
    this.getEventMembers();
  }

  ngOnChanges() {
    this.getEventMembers();
  }

  getEventMembers() {
    this.eventservice.getEventMembers(this.event.id).then(res => {
      this.eventMembers = res;
    });
  }

  deleteEventMember(event) {
    this.eventservice
      .deleteUserFromEvent(event.id, this.event.id)
      .then(res => {
        if (res.response === 'delete-user-from-event-success') {
          this.notificationservice.success('A tag törlése az eseményből sikeres volt');
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A tag törlés közben hiba lépett fel. Kérjük próbálja újra késöbb.');
      });
  }

  updateEventMember(event) {
    console.log(event.data);
    this.eventservice
      .updateEventUser(event.data.id, this.event.id, event.data.roleId)
      .then(res => {
        if (res.response === 'update-event-user-success') {
          this.notificationservice.success('A tag rangjának frissítése sikeres volt');
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

  filter() {}
}
