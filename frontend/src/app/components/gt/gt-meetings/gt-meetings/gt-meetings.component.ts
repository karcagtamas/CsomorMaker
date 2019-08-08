import { Component, OnInit, Input } from '@angular/core';
import { Gt, GtMeeting } from 'src/app/models';
import { GtMeetingsService } from 'src/app/services';

@Component({
  selector: 'app-gt-meetings',
  templateUrl: './gt-meetings.component.html',
  styleUrls: ['./gt-meetings.component.scss']
})
export class GtMeetingsComponent implements OnInit {
  @Input() gt: Gt;
  meetings: GtMeeting[] = [];

  constructor(private gtmeetingsservice: GtMeetingsService) {}

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.gtmeetingsservice
      .getGtMeetings(this.gt.id)
      .then(res => {
        this.meetings = res;
      })
      .catch(() => {
        this.meetings = [];
      });
  }
}
