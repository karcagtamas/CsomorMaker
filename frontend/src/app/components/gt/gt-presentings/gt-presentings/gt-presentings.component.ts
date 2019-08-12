import { Component, OnInit, Input } from '@angular/core';
import { Gt, GtPresenting } from 'src/app/models';
import { GtPresentingServiceService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-presentings',
  templateUrl: './gt-presentings.component.html',
  styleUrls: ['./gt-presentings.component.scss']
})
export class GtPresentingsComponent implements OnInit {
  @Input() gt: Gt;
  presentings: GtPresenting[] = [];

  constructor(
    private gtpresentingservice: GtPresentingServiceService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getPresentings();
  }

  getPresentings() {
    this.gtpresentingservice
      .getGtPresentings(this.gt.id)
      .then(res => {
        this.presentings = res;
      })
      .catch(() => {
        this.presentings = [];
      });
  }
}
