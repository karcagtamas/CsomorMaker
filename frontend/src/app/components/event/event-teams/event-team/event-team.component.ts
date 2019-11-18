import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event, EventTeam } from 'src/app/models';
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
  @Input() event: Event;
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

  setIsPaidFixCostStatus() {
    this.eventteamsservice
      .setIsPaidFixCostStatus(this.team.id, this.team.isPaidFixCost)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          if (this.team.isPaidFixCost !== this.team.isPaidFixDeposit) {
            this.team.isPaidFixDeposit = this.team.isPaidFixCost;
            this.setIsPaidFixDepositStatus();
          }
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A fizetési státusz állítása közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }

  setIsPaidFixDepositStatus() {
    this.eventteamsservice
      .setIsPaidFixDepositStatus(this.team.id, this.team.isPaidFixDeposit)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A fizetési státusz állítása közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }

  setHasReposnsibilityPaper() {
    this.eventteamsservice
      .setHasResponsibilityPaper(this.team.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('Az állapot állítása közben hiba történt! Kérjük próbálja őjra késöbb!');
      });
  }

  openTeamDetailsModal() {
    const dialogRef = this.dialog.open(TeamDeatilsDialogComponent, {
      data: { team: this.team, event: this.event },
      width: '75%',
      maxHeight: '100vh'
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
