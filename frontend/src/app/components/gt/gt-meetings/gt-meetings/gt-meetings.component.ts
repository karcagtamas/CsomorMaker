import { Component, OnInit, Input } from '@angular/core';
import { Gt, GtMeeting } from 'src/app/models';
import { GtMeetingsService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtMeetingDialogComponent } from '../gt-meeting-dialog/gt-meeting-dialog.component';

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
  rightSum: number[] = [];
  bottomSum: number[] = [];

  constructor(
    private gtmeetingsservice: GtMeetingsService,
    private notificationservice: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.gtmeetingsservice
      .getGtMeetings(this.gt.id)
      .then(res => {
        this.meetings = res;
        this.setIndexes();
        this.setRightSum();
        this.setBottomSum();
      })
      .catch(() => {
        this.meetings = [];
      });
  }

  setBottomSum() {
    const sums: number[] = [];
    for (const i of this.meetings) {
      let count = 0;
      for (const j of i.members) {
        if (j.isThere) {
          count++;
        }
      }
      sums.push(count);
    }
    this.bottomSum = sums;
  }

  setRightSum() {
    const sums: number[] = [];
    for (let i = 0; i < this.meetings[0].members.length; i++) {
      let count = 0;
      for (const j of this.meetings) {
        if (j.members[i].isThere) {
          count++;
        }
      }

      sums.push(count);
    }
    this.rightSum = sums;
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
  }

  setIsThere(meeting: GtMeeting, user: number) {
    this.gtmeetingsservice
      .setGtMeetingMemberThereStatus(meeting.id, user)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          this.setRightSum();
          this.setBottomSum();
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A státusz állítása közbe hiba történt! Kérjük próbálja újra késöbb!');
      });
  }

  openGtMeetingDialog(event?) {
    const dialogRef = this.dialog.open(GtMeetingDialogComponent, {
      data: event ? event : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (event) {
          if (result.delete) {
            this.gtmeetingsservice
              .deleteGtMeeting(event.id)
              .then(res => {
                if (res.response === 'success') {
                  this.notificationservice.success(res.message);
                  this.getMeetings();
                  this.setRightSum();
                  this.setBottomSum();
                } else {
                  this.notificationservice.error(res.message);
                }
              })
              .catch(() => {
                this.notificationservice.error('A gyűlés törlése közben hiba történt! Kérjük próbálja újra késöbb');
              });
          } else {
            this.gtmeetingsservice
              .updateGtMeeting(result.date, event.id)
              .then(res => {
                if (res.response === 'success') {
                  this.notificationservice.success(res.message);
                  this.getMeetings();
                  this.setRightSum();
                  this.setBottomSum();
                } else {
                  this.notificationservice.error(res.message);
                }
              })
              .catch(() => {
                this.notificationservice.error('A gyűlés frissítése közben hiba történt! Kérjük próbálja újra késöbb');
              });
          }
        } else {
          this.gtmeetingsservice
            .addGtMeeting(result.date, this.gt.id)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getMeetings();
                this.setRightSum();
                this.setBottomSum();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A gyűlés felvétele közben hiba történt! Kérjük próbálja újra késöbb!');
            });
        }
      }
    });
  }
}
