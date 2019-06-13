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
  menuItems = [
    { name: 'Adatok', link: 'details' },
    { name: 'Beállítások', link: 'settings' },
    { name: 'Generátor', link: 'generator' },
    { name: 'Csömör', link: 'csomor' },
    { name: 'Áttekintés', link: 'summary' },
    { name: 'ToDo', link: 'todo' },
    { name: 'Chat', link: 'chat' }
  ];
  currentEventId = 0;
  currentEvent = new Event();
  currentPage = 'details';

  constructor(private eventservice: EventService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);
      this.eventservice
        .getEvents()
        .then(res => {
          this.events = res;
          if (data.id && data.page) {
            this.currentEventId = data.id;
            this.currentPage = data.page;
            this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
            // console.log(this.events);
          } else {
            this.router.navigateByUrl(`/events/${this.events[0].id}/details`);
          }
        })
        .catch(() => {
          this.events = [];
        });
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
