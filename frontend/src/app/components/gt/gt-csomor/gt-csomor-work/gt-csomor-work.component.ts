import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GtWork, GtWorkTable } from 'src/app/models';
import { GtGeneratorService, ExportService } from 'src/app/services';

@Component({
  selector: 'app-gt-csomor-work',
  templateUrl: './gt-csomor-work.component.html',
  styleUrls: ['./gt-csomor-work.component.scss']
})
export class GtCsomorWorkComponent implements OnInit, OnChanges {
  @Input() gtWorks: GtWork[];
  selectedWork = 0;
  workTables: GtWorkTable[] = [];

  constructor(private gtgeneratorservice: GtGeneratorService, private exportserivce: ExportService) {}

  ngOnInit() {
    if (this.gtWorks.length > 0) {
      this.selectedWork = 0;
      this.getWorkTables();
    }
  }

  ngOnChanges() {
    if (this.gtWorks.length > 0) {
      this.selectedWork = 0;
      this.getWorkTables();
    }
  }

  getWorkTables() {
    const work = this.gtWorks[this.selectedWork];
    this.gtgeneratorservice
      .getGtWorkTables(work.id)
      .then(res => (this.workTables = res))
      .catch(() => (this.workTables = []));
  }

  changeWork() {
    this.getWorkTables();
  }

  exportWork() {
    this.exportserivce.exportWork(this.gtWorks[this.selectedWork]);
  }
}
