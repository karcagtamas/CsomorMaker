import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtPresenting } from 'src/app/models';
import { UserService, GtPresentingServiceService } from 'src/app/services';

@Component({
  selector: 'app-gt-presenting-editors',
  templateUrl: './gt-presenting-editors.component.html',
  styleUrls: ['./gt-presenting-editors.component.scss']
})
export class GtPresentingEditorsComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  userId: number;
  presentings: GtPresenting[] = [];

  constructor(private userservice: UserService, private gtpresenetingsservice: GtPresentingServiceService) {}

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
}
