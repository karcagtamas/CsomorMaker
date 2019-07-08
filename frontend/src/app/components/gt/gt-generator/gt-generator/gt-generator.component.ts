import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtWork, GtWorker } from 'src/app/models';
import { GtGeneratorService } from 'src/app/services/gt-generator.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-generator',
  templateUrl: './gt-generator.component.html',
  styleUrls: ['./gt-generator.component.scss']
})
export class GtGeneratorComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  gtWorks: GtWork[] = [];
  gtWorkers: GtWorker[] = [];
  workStep = -1;
  workerStep = -1;

  constructor(
    private gtgeneratorservice: GtGeneratorService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getWorks();
    this.getWorkers();
  }

  ngOnChanges() {
    this.getWorks();
    this.getWorkers();
    this.workStep = -1;
    this.workerStep = -1;
  }

  getWorks() {
    this.gtgeneratorservice
      .getGtWorks(this.gt.id)
      .then(res => {
        this.gtWorks = res;
      })
      .catch(() => {
        this.gtWorks = [];
      });
  }

  getWorkers() {
    this.gtgeneratorservice
      .getLowGtWorkers(this.gt.id)
      .then(res => {
        this.gtWorkers = res;
      })
      .catch(() => {
        this.gtWorkers = [];
      });
  }

  setWorkStep(index: number) {
    this.workStep = index;
  }

  nextWorkStep() {
    this.workStep++;
  }

  prevWorkStep() {
    this.workStep--;
  }

  setWorkerStep(index: number) {
    this.workerStep = index;
  }

  nextWorkerStep() {
    this.workerStep++;
  }

  prevWorkerStep() {
    this.workerStep--;
  }

  deleteWork(event) {
    this.gtgeneratorservice
      .deleteGtWork(event.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          this.gtWorks = this.gtWorks.filter(x => x.id !== event.id);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A poszt törlése közben hiba történt! Kérjük pórbálja újra késöbb!');
      });
  }
}
