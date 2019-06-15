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
          this.alert.emit({ msg: 'Sikeresen törölte a posztot!' });
        } else {
          this.alert.emit({ msg: res.message });
        }
      })
      .catch(() => {
        this.alert.emit({ msg: 'A poszt törlése közben hiba történt! Kréjük pórbálja újra késöbb!' });
      });
  }
}
