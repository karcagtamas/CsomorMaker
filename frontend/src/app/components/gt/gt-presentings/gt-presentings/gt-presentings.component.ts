import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtPresenting, GtMember } from 'src/app/models';
import { GtPresentingServiceService, NotificationService, GtMembersService } from 'src/app/services';
import { GtPresentingDialogComponent } from '../gt-presenting-dialog/gt-presenting-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gt-presentings',
  templateUrl: './gt-presentings.component.html',
  styleUrls: ['./gt-presentings.component.scss']
})
export class GtPresentingsComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  members: GtMember[] = [];
  presentings: GtPresenting[] = [];

  constructor(
    private gtpresentingservice: GtPresentingServiceService,
    private notificationservice: NotificationService,
    private gtmembers: GtMembersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getGtMembers();
  }

  ngOnChanges() {
    this.getGtMembers();
  }

  getGtMembers() {
    this.gtmembers
      .getGtMembers(this.gt.id)
      .then(res => {
        this.members = res;
      })
      .catch(() => {
        this.members = [];
      });
  }

  openPresentingDialog() {
    const dialogRef = this.dialog.open(GtPresentingDialogComponent, {
      data: { members: this.members, gt: this.gt }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtpresentingservice
          .setGtPresentingLicensedStatus(this.gt.id, result.user1, result.user2)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getGtMembers();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A státusz állítása sikertelen! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }
}
