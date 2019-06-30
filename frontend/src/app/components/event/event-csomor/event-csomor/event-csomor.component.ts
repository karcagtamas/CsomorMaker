import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Event, EventWorker, EventWork } from 'src/app/models';
import { EventGeneratorService } from 'src/app/services';

@Component({
  selector: 'app-event-csomor',
  templateUrl: './event-csomor.component.html',
  styleUrls: ['./event-csomor.component.scss']
})
export class EventCsomorComponent implements OnInit, OnChanges {
  @Input() event: Event;
  selectedMode = 1;
  eventWorkers: EventWorker[] = [];
  eventWorks: EventWork[] = [];

  constructor(private eventgeneratorservice: EventGeneratorService) {}

  ngOnInit() {
    this.getEventWorkers();
  }

  ngOnChanges() {
    switch (this.selectedMode) {
      case 1:
        this.getEventWorkers();
        break;
      case 2:
        this.getEventWorks();
        break;
    }
  }

  getEventWorks() {
    this.eventgeneratorservice
      .getWorks(this.event.id)
      .then(res => {
        this.eventWorks = res;
      })
      .catch(() => {
        this.eventWorks = [];
      });
  }

  getEventWorkers() {
    this.eventgeneratorservice
      .getEventLowWorkers(this.event.id)
      .then(res => {
        this.eventWorkers = res;
      })
      .catch(() => {
        this.eventWorkers = [];
      });
  }

  changeSelection(newSelect: number) {
    this.selectedMode = newSelect;
    switch (this.selectedMode) {
      case 1:
        this.getEventWorkers();
        break;
      case 2:
        this.getEventWorks();
        break;
    }
  }
}
