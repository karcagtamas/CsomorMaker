import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtPresenting } from 'src/app/models';
import { UserService, GtPresentingServiceService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-presenting-editors',
  templateUrl: './gt-presenting-editors.component.html',
  styleUrls: ['./gt-presenting-editors.component.scss']
})
export class GtPresentingEditorsComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  userId: number;
  presentings: GtPresenting[] = [];

  constructor(
    private userservice: UserService,
    private gtpresenetingsservice: GtPresentingServiceService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.userservice.getId().then(res => {
      this.userId = res;
      this.getPresentings();
    });
  }

  ngOnChanges() {
    this.getPresentings();
  }

  getPresentings() {
    this.gtpresenetingsservice
      .getGtPresentingForUser(this.gt.id, this.userId)
      .then(res => {
        this.presentings = res;
      })
      .catch(() => {
        this.presentings = [];
      });
  }

  updatePresenting(event) {
    this.gtpresenetingsservice
      .updatePresentingAnswer(this.gt.id, event.presenter, event.presented, event.answer)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          this.getPresentings();
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A DÖK bemutatás állítás közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }
}
