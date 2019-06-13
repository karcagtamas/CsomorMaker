import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models';
import { EventService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  currentEvent = 1;
  currentPage = 'details';

  constructor(private eventservice: EventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);
      if (data.id && data.page) {
        this.currentEvent = data.id;
        this.currentPage = data.page;
      } else {
        this.router.navigateByUrl(`/events/${this.events[0].id}/details`);
      }
    });
    this.getEvents();
  }

  getEvents() {
    this.eventservice
      .getEvents()
      .then(res => {
        this.events = res;
      })
      .catch(() => {
        this.events = [];
      });
  }
}
