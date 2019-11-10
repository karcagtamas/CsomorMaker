import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventWorker } from 'src/app/models';
import { EventGeneratorService, ExportService } from 'src/app/services';
import { EventWorkerTable } from 'src/app/models/event.worker.table.model';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event-personal-csomor',
  templateUrl: './event-personal-csomor.component.html',
  styleUrls: ['./event-personal-csomor.component.scss']
})
export class EventPersonalCsomorComponent implements OnInit, OnChanges {
  @Input() eventWorkers: EventWorker[];
  @Input() event: Event;
  selectedWorker = 0;
  workerTables: EventWorkerTable[] = [];
  hoverValue = '-';
  currentDay = 0;
  currentHour = 0;

  constructor(private eventgeneratorservice: EventGeneratorService, private exportserivce: ExportService) {}

  ngOnInit() {
    if (this.eventWorkers.length > 0) {
      this.selectedWorker = 0;
      this.getWorkerTables();
    }
  }

  ngOnChanges() {
    if (this.eventWorkers.length > 0) {
      this.selectedWorker = 0;
      this.getWorkerTables();
    }
  }

  getWorkerTables() {
    const worker = this.eventWorkers[this.selectedWorker];
    this.eventgeneratorservice
      .getWorkerTables(worker.id, worker.event)
      .then(res => (this.workerTables = res))
      .catch(() => (this.workerTables = []));
  }

  changeWorker() {
    this.getWorkerTables();
  }

  exportPersonal() {
    this.exportserivce.exportEventPersonal(this.eventWorkers[this.selectedWorker]);
  }

  checkCurrent(workerTable: EventWorkerTable) {
    if (this.event.startDate) {
      const now: Date = new Date();
      const afterStart: Date = new Date(this.event.startDate);
      afterStart.setHours(workerTable.hour);
      afterStart.setDate(afterStart.getDate() + workerTable.day);

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
