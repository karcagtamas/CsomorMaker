import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { EventMember, Event } from 'src/app/models';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.component.html',
  styleUrls: ['./event-members.component.scss']
})
export class EventMembersComponent implements OnInit, OnChanges {
  @Input() event: Event;
  filterValue = '';
  eventMembers: EventMember[];

  constructor(private eventservice: EventService) {}

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

  deleteEventMember(event) {}

  updateEventMember(event) {}

  filter() {}
}
