import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models';
import { EventService, NotificationService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  menuItems = [
    { name: 'Adatok', link: 'details', accessLevel: 1 },
    { name: 'Beállítások', link: 'settings', accessLevel: 3 },
    { name: 'Generátor', link: 'generator', accessLevel: 3 },
    { name: 'Csömör', link: 'csomor', accessLevel: 1 },
    { name: 'Áttekintés', link: 'summary', accessLevel: 3 },
    { name: 'ToDo', link: 'todo', accessLevel: 2 },
    { name: 'Chat', link: 'chat', accessLevel: 1 },
    { name: 'Tagok', link: 'members', accessLevel: 1 },
    { name: 'Csapatok', link: 'teams', accessLevel: 2 }
  ];
  currentEventId = 0;
  currentEvent = new Event();
  currentPage = 'details';
  accessLevel = 0;

  constructor(
    private eventservice: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationservice: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.eventservice
        .getEvents()
        .then(res => {
          this.events = res;
          if (data.id && data.page) {
            this.currentEventId = data.id;
            this.currentPage = data.page;
            this.currentEvent = this.events.find(x => x.id === +this.currentEventId);
            this.eventservice
              .getEventAccessLevel(this.currentEventId)
              .then(acl => {
                this.accessLevel = acl;
              })
              .catch(() => {
                this.accessLevel = 0;
              });
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
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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
    if (isSuccess) {
      this.notificationservice.success(value);
    } else {
      this.notificationservice.error(value);
    }
  }

  updateAlert(event) {
    this.setAlert(event.msg, event.isSuccess);
  }

  lockEvent(event) {
    this.eventservice
      .lockEvent(event.id)
      .then(res => {
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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
        if (res.response === 'success') {
          this.setAlert(res.message, true);
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

  disableEvent() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Esemény deaktiválása', name: this.currentEvent.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventservice
          .disableEvent(this.currentEvent.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getEvents();
              this.router.navigateByUrl('/events');
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('Az esemény deaktíválása közben hiba történt! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }
}
