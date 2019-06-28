import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventTeam } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService, EventTeamsService } from 'src/app/services';
import { TeamDeatilsDialogComponent } from '../team-deatils-dialog/team-deatils-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-event-team',
  templateUrl: './event-team.component.html',
  styleUrls: ['./event-team.component.scss']
})
export class EventTeamComponent implements OnInit {
  @Input() team: EventTeam;
  @Input() eventId: number;
  @Output() refresh = new EventEmitter();
  countOfCost = 0;
  countOfDeposit = 0;

  constructor(
    private eventteamsservice: EventTeamsService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.eventteamsservice
      .countOfCostAndDeposit(this.team.id)
      .then(res => {
        this.countOfCost = res.countOfCost;
        this.countOfDeposit = res.countOfDeposit;
      })
      .catch(() => {
        this.countOfCost = 0;
        this.countOfDeposit = 0;
      });
  }

  openTeamDetailsModal() {
    const dialogRef = this.dialog.open(TeamDeatilsDialogComponent, {
      data: this.team,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventteamsservice
          .updateEventTeam(this.team.id, result.name)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.refresh.emit();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A csapat frissítése közben hiba lépett fel. Kérjük próbálja újra késöbb.');
          });
      }
    });
  }

  openConfirmDeleteModal() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { name: this.team.name, title: 'Csapat törlése' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventteamsservice
          .deleteEventTeam(this.team.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.refresh.emit();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A csapat törlése közben hiba lépett fel. Kérjük próbálja újra késöbb.');
          });
      }
    });
  }
}
