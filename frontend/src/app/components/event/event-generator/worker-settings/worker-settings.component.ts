import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventWorker } from 'src/app/models';
import { EventWorkerTable } from 'src/app/models/event.worker.table.model';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-worker-settings',
  templateUrl: './worker-settings.component.html',
  styleUrls: ['./worker-settings.component.scss']
})
export class WorkerSettingsComponent implements OnInit {
  @Input() worker: EventWorker;
  @Output() save = new EventEmitter();
  workerTables: EventWorkerTable[] = [];

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.getWorkerTables();
  }

  getWorkerTables() {
    this.eventservice
      .getWorkerTablesWithoutWorkNames(this.worker.id)
      .then(res => {
        this.workerTables = res;
      })
      .catch(() => {
        this.workerTables = [];
      });
  }

  saveWorkerTable(day: number, hour: number, worker: number) {
    this.save.emit({ day, hour, worker });
  }
}
