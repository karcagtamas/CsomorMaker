import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventWork, EventWorkTable } from 'src/app/models';
import { EventGeneratorService } from 'src/app/services';

@Component({
  selector: 'app-event-work-csomor',
  templateUrl: './event-work-csomor.component.html',
  styleUrls: ['./event-work-csomor.component.scss']
})
export class EventWorkCsomorComponent implements OnInit, OnChanges {
  @Input() eventWorks: EventWork[];
  selectedWork = 0;
  workTables: EventWorkTable[] = [];
  hoverValue = '-';

  constructor(private eventgeneratorservice: EventGeneratorService) {}

  ngOnInit() {
    if (this.eventWorks.length > 0) {
      this.selectedWork = 0;
      this.getWorkTables();
    }
  }

  ngOnChanges() {
    if (this.eventWorks.length > 0) {
      this.selectedWork = 0;
      this.getWorkTables();
    }
  }

  getWorkTables() {
    const work = this.eventWorks[this.selectedWork];
    this.eventgeneratorservice
      .getWorkTables(work.id)
      .then(res => (this.workTables = res))
      .catch(() => (this.workTables = []));
  }

  changeWork() {
    this.getWorkTables();
  }
}
