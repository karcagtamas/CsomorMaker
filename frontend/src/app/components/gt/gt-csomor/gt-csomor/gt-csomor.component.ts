import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtWorker, GtWork } from 'src/app/models';
import { GtGeneratorService } from 'src/app/services/gt-generator.service';

@Component({
  selector: 'app-gt-csomor',
  templateUrl: './gt-csomor.component.html',
  styleUrls: ['./gt-csomor.component.scss']
})
export class GtCsomorComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  selectedMode = 1;
  gtWorkers: GtWorker[] = [];
  gtWorks: GtWork[] = [];

  constructor(private gtgeneratorserivce: GtGeneratorService) {}

  ngOnInit() {
    this.getGtWorkers();
  }

  ngOnChanges() {
    switch (this.selectedMode) {
      case 1:
        this.getGtWorkers();
        break;
      case 2:
        this.getGtWorks();
        break;
    }
  }

  getGtWorkers() {
    this.gtgeneratorserivce
      .getLowGtWorkers(this.gt.id)
      .then(res => {
        this.gtWorkers = res;
      })
      .catch(() => {
        this.gtWorkers = [];
      });
  }

  getGtWorks() {
    this.gtgeneratorserivce
      .getGtWorks(this.gt.id)
      .then(res => {
        this.gtWorks = res;
      })
      .catch(() => (this.gtWorks = []));
  }

  changeSelection(newSelect: number) {
    this.selectedMode = newSelect;
    switch (this.selectedMode) {
      case 1:
        this.getGtWorkers();
        break;
      case 2:
        this.getGtWorks();
        break;
    }
  }
}
