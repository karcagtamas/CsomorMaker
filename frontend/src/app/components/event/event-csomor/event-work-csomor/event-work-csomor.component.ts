import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventWork, EventWorkTable, Event } from 'src/app/models';
import { EventGeneratorService, ExportService } from 'src/app/services';

@Component({
  selector: 'app-event-work-csomor',
  templateUrl: './event-work-csomor.component.html',
  styleUrls: ['./event-work-csomor.component.scss']
})
export class EventWorkCsomorComponent implements OnInit, OnChanges {
  @Input() eventWorks: EventWork[];
  @Input() event: Event;
  selectedWork = 0;
  workTables: EventWorkTable[] = [];
  hoverValue = '-';

  constructor(private eventgeneratorservice: EventGeneratorService, private exportserive: ExportService) {}

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

  exportWork() {
    this.exportserive.exportEventWork(this.eventWorks[this.selectedWork]);
  }

  checkCurrent(workTable: EventWorkTable) {
    if (this.event.startDate) {
      const now: Date = new Date();
      const afterStart: Date = new Date(this.event.startDate);
      afterStart.setHours(workTable.hour);
      afterStart.setDate(afterStart.getDate() + workTable.day);

      if (
        afterStart.getFullYear() === now.getFullYear() &&
        afterStart.getMonth() === now.getMonth() &&
        afterStart.getDate() === now.getDate() &&
        afterStart.getHours() === now.getHours()
      ) {
        return true;
      }
    }
    return false;
  }
}
