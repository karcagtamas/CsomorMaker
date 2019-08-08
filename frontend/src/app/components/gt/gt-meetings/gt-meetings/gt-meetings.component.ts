import { Component, OnInit, Input } from '@angular/core';
import { Gt, GtMeeting } from 'src/app/models';
import { GtMeetingsService } from 'src/app/services';

interface Index {
  index: number;
  user: string;
  userId: number;
}

@Component({
  selector: 'app-gt-meetings',
  templateUrl: './gt-meetings.component.html',
  styleUrls: ['./gt-meetings.component.scss']
})
export class GtMeetingsComponent implements OnInit {
  @Input() gt: Gt;
  meetings: GtMeeting[] = [];
  indexes: Index[] = [];

  constructor(private gtmeetingsservice: GtMeetingsService) {}

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.gtmeetingsservice
      .getGtMeetings(this.gt.id)
      .then(res => {
        this.meetings = res;
        this.setIndexes();
      })
      .catch(() => {
        this.meetings = [];
      });
  }

  setIndexes() {
    this.indexes = [];
    if (this.meetings.length > 0) {
      for (let i = 0; i < this.meetings[0].members.length; i++) {
        this.indexes.push({
          index: i,
          user: this.meetings[0].members[i].user,
          userId: this.meetings[0].members[i].userId
        });
      }
    }
    console.log(this.indexes);
  }

  setIsThere(meeting: GtMeeting, user: number) {
    this.gtmeetingsservice
      .setGtMeetingMemberThereStatus(meeting.id, user)
      .then(res => {
        if (res.response === 'success') {
        } else {
        }
      })
      .catch(() => {});
  }
}
