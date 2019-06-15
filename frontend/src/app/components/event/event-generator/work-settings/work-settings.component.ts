import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventWork } from 'src/app/models';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-work-settings',
  templateUrl: './work-settings.component.html',
  styleUrls: ['./work-settings.component.scss']
})
export class WorkSettingsComponent implements OnInit {
  @Input() work: EventWork;
  @Output() delete = new EventEmitter();
  workTables = [];

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.getWorkTables();
  }

  getWorkTables() {
    this.eventservice
      .getWorkTablesWithoutWorkerNames(this.work.id)
      .then(res => {
        this.workTables = res;
      })
      .catch(() => {
        this.workTables = [];
      });
  }

  deleteWork() {
    this.delete.emit({ id: this.work.id });
  }
}
