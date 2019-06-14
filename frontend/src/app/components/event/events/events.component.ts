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
    { name: 'Tagok', link: 'members' },
    { name: 'Csapatok', link: 'teams' }
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

  lockEvent(event) {
    this.eventservice
      .lockEvent(event.id)
      .then(res => {
        if (res.response === 'event-lock-success') {
          this.setAlert('Az esemény zárolása/feloldása sikeres!', true);
          const old = this.events.findIndex(x => x.id === +event.id);
          this.events[old].isLocked = this.events[old].isLocked ? false : true;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert('Az esemény zárolása/feloldása közben hiba történt! Kérjük próbálja újra késöbb!', false);
      });
  }

  increaseVisitors(event) {
    this.eventservice
      .increaseVisitors(event.id)
      .then(res => {
        if (res.response === 'visitor-increase-success') {
          this.setAlert('Az esemény részvevőinek száma sikeresen növelve!', true);
          const old = this.events.findIndex(x => x.id === +event.id);
          this.events[old].visitors++;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert(
          'Az esemény részvevőinek számának növelése közben hiba történt! Kérjük próbálja újra késöbb!',
          false
        );
      });
  }

  decreaseVisitors(event) {
    this.eventservice
      .decreaseVisitors(event.id)
      .then(res => {
        if (res.response === 'visitor-decrease-success') {
          this.setAlert('Az esemény részvevőinek száma sikeresen csökkentve!', true);
          const old = this.events.findIndex(x => x.id === +event.id);
          this.events[old].visitors--;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert(
          'Az esemény részvevőinek számának csökkentése közben hiba történt! Kérjük próbálja újra késöbb!',
          false
        );
      });
  }

  increaseInjured(event) {
    this.eventservice
      .increaseInjured(event.id)
      .then(res => {
        if (res.response === 'injured-increase-success') {
          this.setAlert('Az esemény sérültjeinek száma sikeresen növelve!', true);
          const old = this.events.findIndex(x => x.id === +event.id);
          this.events[old].injured++;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert(
          'Az esemény sérültjeinek számának növelése közben hiba történt! Kérjük próbálja újra késöbb!',
          false
        );
      });
  }

  decreaseInjured(event) {
    this.eventservice
      .decreaseInjured(event.id)
      .then(res => {
        if (res.response === 'injured-decrease-success') {
          this.setAlert('Az esemény sérültjeinek száma sikeresen csökkentve!', true);
          const old = this.events.findIndex(x => x.id === +event.id);
          this.events[old].injured--;
          this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
        } else {
          this.setAlert(res.message, false);
        }
      })
      .catch(() => {
        this.setAlert(
          'Az esemény sérültjeinek számának csökkentése közben hiba történt! Kérjük próbálja újra késöbb!',
          false
        );
      });
  }
}
