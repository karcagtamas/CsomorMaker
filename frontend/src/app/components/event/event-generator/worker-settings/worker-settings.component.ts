import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventWorker, EventWorkStatus } from 'src/app/models';
import { EventWorkerTable } from 'src/app/models/event.worker.table.model';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-worker-settings',
  templateUrl: './worker-settings.component.html',
  styleUrls: ['./worker-settings.component.scss']
})
export class WorkerSettingsComponent implements OnInit {
  @Input() worker: EventWorker;
  @Input() eventId: number;
  @Output() saveTable = new EventEmitter();
  @Output() saveStatus = new EventEmitter();
  workerTables: EventWorkerTable[] = [];
  workStatuses: EventWorkStatus[] = [];

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.getWorkerTables();
    this.getWorkStatuses();
  }

  getWorkerTables() {
    this.eventservice
      .getWorkerTablesWithoutWorkNames(this.worker.id, this.eventId)
      .then(res => {
        this.workerTables = res;
      })
      .catch(() => {
        this.workerTables = [];
      });
  }

  getWorkStatuses() {
    this.eventservice
      .getWorkStatuses(this.worker.id, this.eventId)
      .then(res => {
        this.workStatuses = res;
      })
      .catch(() => {
        this.workStatuses = [];
      });
  }

  saveWorkerTable(day: number, hour: number, worker: number) {
    this.saveTable.emit({ day, hour, worker });
  }

  saveWorkStatus(work: number) {
    this.saveStatus.emit({ work, worker: this.worker.id });
  }
}
