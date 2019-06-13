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
  updateIsSuccess = false;
  alert = '';

  menuItems = [
    { name: 'Adatok', link: 'details' },
    { name: 'Beállítások', link: 'settings' },
    { name: 'Generátor', link: 'generator' },
    { name: 'Csömör', link: 'csomor' },
    { name: 'Áttekintés', link: 'summary' },
    { name: 'ToDo', link: 'todo' },
    { name: 'Chat', link: 'chat' },
    { name: 'Tagok', link: 'members' }
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
            console.log(this.currentEvent);
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

  updateEvent(event) {
    this.eventservice
      .updateEvent(event.event)
      .then(res => {
        if (res.response === 'update-event-success') {
          this.setAlert('Esemény frissítése sikeres!', true);
          const old = this.events.findIndex(x => x.id === +event.event.id);
          this.events[old] = event.event;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
          console.log(this.events);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert('Az esemény frissítése közben hiba történt! Kérjük próbálja újra késöbb!', false);
      });
  }

  setAlert(value: string, isSuccess: boolean) {
    this.alert = value;
    this.updateIsSuccess = isSuccess;
    setTimeout(() => {
      this.alert = '';
    }, 5000);
  }

  updateAlert(event) {
    this.setAlert(event.msg, false);
  }
}
