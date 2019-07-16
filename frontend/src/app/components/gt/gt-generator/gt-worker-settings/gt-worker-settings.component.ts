import { Component, OnInit, Input } from '@angular/core';
import { GtWorker, GtWorkStatus } from 'src/app/models';
import { GtGeneratorService } from 'src/app/services/gt-generator.service';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-worker-settings',
  templateUrl: './gt-worker-settings.component.html',
  styleUrls: ['./gt-worker-settings.component.scss']
})
export class GtWorkerSettingsComponent implements OnInit {
  @Input() worker: GtWorker;
  workStatuses: GtWorkStatus[] = [];

  constructor(private gtgeneratorservice: GtGeneratorService, private notificationservice: NotificationService) {}

  ngOnInit() {
    this.getWorkStatuses();
  }

  getWorkStatuses() {
    this.gtgeneratorservice
      .getGtWorkStatuses(this.worker.id, this.worker.gt)
      .then(res => {
        this.workStatuses = res;
      })
      .catch(() => {
        this.workStatuses = [];
      });
  }

  setWorkStatusActive(workId: number) {
    this.gtgeneratorservice
      .setGtWorkStatusIsActive(this.worker.id, workId)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A státusz állítása közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }

  setWorkStatusBoss(workId: number) {
    this.gtgeneratorservice
      .setGtWorkStatusIsBoss(this.worker.id, workId)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A státusz állítása közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }
}
