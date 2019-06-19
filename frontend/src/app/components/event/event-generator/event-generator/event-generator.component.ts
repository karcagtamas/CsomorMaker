import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Event, EventWork, EventWorker } from 'src/app/models';
import { EventService, NotificationService } from 'src/app/services';
import { AddNewWorkComponent } from '../add-new-work/add-new-work.component';

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.scss']
})
export class EventGeneratorComponent implements OnInit, OnChanges {
  @Input() event: Event;
  eventWorks: EventWork[] = [];
  eventWorkers: EventWorker[] = [];
  workStep = -1;
  workerStep = -1;

  constructor(
    private eventservice: EventService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getWorks();
    this.getWorkers();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getWorks();
    this.getWorkers();
    this.workStep = -1;
    this.workerStep = -1;
  }

  getWorks() {
    this.eventservice
      .getWorks(this.event.id)
      .then(res => {
        this.eventWorks = res;
      })
      .catch(() => {
        this.eventWorks = [];
      });
  }

  getWorkers() {
    this.eventservice
      .getEventLowWorkers(this.event.id)
      .then(res => {
        this.eventWorkers = res;
      })
      .catch(() => {
        this.eventWorkers = [];
      });
  }

  setWorkStep(index: number) {
    this.workStep = index;
  }

  nextWorkStep() {
    this.workStep++;
  }

  prevWorkStep() {
    this.workStep--;
  }

  setWorkerStep(index: number) {
    this.workerStep = index;
  }

  nextWorkerStep() {
    this.workerStep++;
  }

  prevWorkerStep() {
    this.workerStep--;
  }

  deleteWork(event) {
    this.eventservice
      .deleteWork(event.id)
      .then(res => {
        if (res.response === 'delete-work-success') {
          this.notificationservice.success('Sikeresen törölte a posztot!');
          this.eventWorks = this.eventWorks.filter(x => x.id !== event.id);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A poszt törlése közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }

  saveWorkTable(event) {
    this.eventservice
      .setIsActiveWorkHour(event.day, event.hour, event.work)
      .then(res => {
        if (res.response === 'set-work-table-is-active-success') {
          this.notificationservice.success('Sikeresen állította a tábla elemet!');
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A poszt tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }

  saveWorkStatus(event) {
    this.eventservice
      .setIsValidWorkStatus(event.worker, event.work)
      .then(res => {
        if (res.response === 'set-work-status-is-valid-success') {
          this.notificationservice.success('Sikeresen állította a poszt és humán kapcsolatát!');
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'A poszt és humán kapcsolatának beállítása közben hiba történt! Kérjük pórbálja újra késöbb!'
        );
      });
  }

  saveWorkerTable(event) {
    this.eventservice
      .setIsAvaiableWorkerHour(event.day, event.hour, event.worker, this.event.id)
      .then(res => {
        if (res.response === 'set-worker-table-is-avaiable-success') {
          this.notificationservice.success('Sikeresen állította a tábla elemet!');
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A humán tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }

  openAddNewWorkDialog() {
    const dialogRef = this.dialog.open(AddNewWorkComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventservice
          .addWork(result.name, this.event.id)
          .then(res => {
            if (res.response === 'add-work-success') {
              this.notificationservice.success('A poszt felvétele sikeres volt!');
              this.getWorks();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A poszt felvétele közben hiba történt! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }

  generate() {
    this.eventservice
      .generate(this.event.id)
      .then(res => {
        if (res.response === 'gen-success') {
          this.notificationservice.success('A generálás sikeres!');
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A generálás során valami hiba történt! Kérjük próbálja meg újra késöbb!');
      });
  }
}
