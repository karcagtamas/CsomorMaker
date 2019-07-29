import { GtGeneratorService, ExportService } from 'src/app/services';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { GtWorker, GtWorkerTable } from 'src/app/models';

@Component({
  selector: 'app-gt-csomor-personal',
  templateUrl: './gt-csomor-personal.component.html',
  styleUrls: ['./gt-csomor-personal.component.scss']
})
export class GtCsomorPersonalComponent implements OnInit, OnChanges {
  @Input() gtWorkers: GtWorker[];
  selectedWorker = 0;
  workerTables: GtWorkerTable[] = [];
  hoverValue = '-';

  constructor(private gtgeneratorservice: GtGeneratorService, private exportservice: ExportService) {}

  ngOnInit() {
    if (this.gtWorkers.length > 0) {
      this.selectedWorker = 0;
      this.getWorkerTables();
    }
  }

  ngOnChanges() {
    if (this.gtWorkers.length > 0) {
      this.selectedWorker = 0;
      this.getWorkerTables();
    }
  }

  getWorkerTables() {
    const worker = this.gtWorkers[this.selectedWorker];
    this.gtgeneratorservice
      .getGtWorkerTables(worker.id, worker.gt)
      .then(res => (this.workerTables = res))
      .catch(() => (this.workerTables = []));
  }

  changeWorker() {
    this.getWorkerTables();
  }

  exportPersonal() {
    this.exportservice.exportPersonal(this.gtWorkers[this.selectedWorker]);
  }
}
