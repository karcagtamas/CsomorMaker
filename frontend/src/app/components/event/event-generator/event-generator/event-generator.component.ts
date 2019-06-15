import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Event, EventWork } from 'src/app/models';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.scss']
})
export class EventGeneratorComponent implements OnInit, OnChanges {
  @Input() event: Event;
  @Output() alert = new EventEmitter();
  eventWorks: EventWork[] = [];
  step = -1;

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.getWorks();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getWorks();
    this.step = -1;
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

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
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
}
