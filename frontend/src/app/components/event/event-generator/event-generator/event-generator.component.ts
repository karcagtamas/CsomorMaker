import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Event, EventWork, EventWorker } from 'src/app/models';
import { EventService } from 'src/app/services';
import { AddNewWorkComponent } from '../add-new-work/add-new-work.component';

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.scss']
})
export class EventGeneratorComponent implements OnInit, OnChanges {
  @Input() event: Event;
  @Output() alert = new EventEmitter();
  eventWorks: EventWork[] = [];
  eventWorkers: EventWorker[] = [];
  workStep = -1;
  workerStep = -1;

  constructor(private eventservice: EventService, public dialog: MatDialog) {}

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
          this.alert.emit({ msg: 'Sikeresen törölte a posztot!', isSuccess: true });
          this.eventWorks = this.eventWorks.filter(x => x.id !== event.id);
        } else {
          this.alert.emit({ msg: res.message, isSuccess: false });
        }
      })
      .catch(() => {
        this.alert.emit({ msg: 'A poszt törlése közben hiba történt! Kérjük pórbálja újra késöbb!', isSuccess: false });
      });
  }

  saveWorkTable(event) {
    this.eventservice
      .setIsActiveWorkHour(event.day, event.hour, event.work)
      .then(res => {
        if (res.response === 'set-work-table-is-active-success') {
          this.alert.emit({ msg: 'Sikeresen állította a tábla elemet!', isSuccess: true });
        } else {
          this.alert.emit({ msg: res.message, isSuccess: false });
        }
      })
      .catch(() => {
        this.alert.emit({
          msg: 'A poszt tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!',
          isSuccess: false
        });
      });
  }

  saveWorkerTable(event) {
    this.eventservice
      .setIsAvaiableWorkerHour(event.day, event.hour, event.worker, this.event.id)
      .then(res => {
        if (res.response === 'set-worker-table-is-avaiable-success') {
          this.alert.emit({ msg: 'Sikeresen állította a tábla elemet!', isSuccess: true });
        } else {
          this.alert.emit({ msg: res.message, isSuccess: false });
        }
      })
      .catch(() => {
        this.alert.emit({
          msg: 'A humán tábla elem állítása közben hiba történt! Kérjük pórbálja újra késöbb!',
          isSuccess: false
        });
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
              this.alert.emit({ msg: 'A poszt felvétele sikeres volt!', isSuccess: true });
              this.getWorks();
            } else {
              this.alert.emit({ msg: res.message, isSuccess: false });
            }
          })
          .catch(() => {
            this.alert.emit({
              msg: 'A poszt felvétele közben hiba történt! Kérjük próbálja újra késöbb!',
              isSuccess: false
            });
          });
      }
    });
  }
}
