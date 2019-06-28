import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { Event, EventTeam } from 'src/app/models';
import { EventTeamsService, NotificationService } from 'src/app/services';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';

@Component({
  selector: 'app-event-teams',
  templateUrl: './event-teams.component.html',
  styleUrls: ['./event-teams.component.scss']
})
export class EventTeamsComponent implements OnInit {
  @Input() event: Event;
  teams: EventTeam[] = [];

  constructor(
    private eventteamsservice: EventTeamsService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.eventteamsservice
      .getEventTeams(this.event.id)
      .then(res => {
        this.teams = res;
      })
      .catch(() => {
        this.teams = [];
      });
  }

  openAddTeamModal() {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      data: this.event.id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventteamsservice
          .addEventTeam(this.event.id, result.name)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getTeams();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A csapat hozzáadása közben hiba lépett fel. Kérjük próbálja újra késöbb.');
          });
      }
    });
  }
}
