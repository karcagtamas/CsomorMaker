import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event, EventWork, EventWorker } from 'src/app/models';
import { NotificationService, EventGeneratorService } from 'src/app/services';
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
    private eventgeneratorservice: EventGeneratorService,
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
    this.eventgeneratorservice
      .getWorks(this.event.id)
      .then(res => {
        this.eventWorks = res;
      })
      .catch(() => {
        this.eventWorks = [];
      });
  }

  getWorkers() {
    this.eventgeneratorservice
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
    this.eventgeneratorservice
      .deleteWork(event.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
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
    this.eventgeneratorservice
      .setIsActiveWorkHour(event.day, event.hour, event.work)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A poszt tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }

  saveWorkStatus(event) {
    this.eventgeneratorservice
      .setIsValidWorkStatus(event.worker, event.work)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
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
    this.eventgeneratorservice
      .setIsAvaiableWorkerHour(event.day, event.hour, event.worker, this.event.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A humán tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }

  openAddNewWorkDialog() {
    const dialogRef = this.dialog.open(AddNewWorkComponent, { width: '50%' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventgeneratorservice
          .addWork(result.name, this.event.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getWorks();
              this.getWorkers();
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
    this.eventgeneratorservice
      .generate(this.event.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A generálás során valami hiba történt! Kérjük próbálja meg újra késöbb!');
      });
  }
}
