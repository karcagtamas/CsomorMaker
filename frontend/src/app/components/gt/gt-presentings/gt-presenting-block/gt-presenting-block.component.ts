import { Component, OnInit, Input } from '@angular/core';
import { GtMember, GtPresenting } from 'src/app/models';
import { GtPresentingServiceService } from 'src/app/services';

@Component({
  selector: 'app-gt-presenting-block',
  templateUrl: './gt-presenting-block.component.html',
  styleUrls: ['./gt-presenting-block.component.scss']
})
export class GtPresentingBlockComponent implements OnInit {
  @Input() member: GtMember;
  presentings: GtPresenting[] = [];

  constructor(private gtpresentingsservice: GtPresentingServiceService) {}

  ngOnInit() {
    this.getPresentings();
  }

  getPresentings() {
    this.gtpresentingsservice
      .getGtPresentingForUser(this.member.gt, this.member.userId)
      .then(res => {
        this.presentings = res;
      })
      .catch(() => {
        this.presentings = [];
      });
  }
}
