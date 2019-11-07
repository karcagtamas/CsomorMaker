import { Component, OnInit, Inject } from '@angular/core';
import { EventTeam, EventTeamMember } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { EventTeamsService, NotificationService } from 'src/app/services';
import { AddTeamMemberDialogComponent } from '../add-team-member-dialog/add-team-member-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-team-deatils-dialog',
  templateUrl: './team-deatils-dialog.component.html',
  styleUrls: ['./team-deatils-dialog.component.scss']
})
export class TeamDeatilsDialogComponent implements OnInit {
  teamMembers: EventTeamMember[] = [];
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TeamDeatilsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventTeam,
    private eventteamsservice: EventTeamsService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.nameControl.setValue(this.data.name);
    this.getTeamMembers();
  }

  getTeamMembers() {
    this.eventteamsservice
      .getEventTeamMembers(this.data.id)
      .then(res => {
        this.teamMembers = res;
      })
      .catch(() => {
        this.teamMembers = [];
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (!this.nameControl.invalid) {
      this.dialogRef.close({ name: this.nameControl.value });
    }
  }

  isLeader(member: EventTeamMember) {
    return this.data.teamLeaderId === member.id;
  }

  openAddTeamMemberModal() {
    const dialogRef = this.dialog.open(AddTeamMemberDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventteamsservice
          .addEventTeamMember(this.data.id, result.name)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getTeamMembers();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A csapat tag hozzáadása közben hiba történt! Kérjük próbálja újra késöbb!');
          });
      }
    });
  }

  setDeposit(member: EventTeamMember) {
    this.eventteamsservice
      .setDeposit(member.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'A csapat tag előleg átállítás közben hiba történt. Kérjük próbálja meg újra késöbb.'
        );
      });
  }

  setCost(member: EventTeamMember) {
    this.eventteamsservice
      .setCost(member.id)
      .then(res => {
        if (res.response === 'success') {
          this.notificationservice.success(res.message);
          member.isPaidDeposit = member.isPaidCost;
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error(
          'A csapat tag díj átállítás közben hiba történt. Kérjük próbálja meg újra késöbb.'
        );
      });
  }

  setTeamMemberToTeamLeader(member: EventTeamMember) {
    this.eventteamsservice
      .setTeamMemberToTeamLeader(member.team, member.id)
      .then(res => {
        if (res.response === 'success') {
          this.data.teamLeaderId = member.id;
          this.data.teamLeader = member.name;
          this.notificationservice.success(res.message);
        } else {
          this.notificationservice.error(res.message);
        }
      })
      .catch(() => {
        this.notificationservice.error('A csapattag beállítása közben hiba történt! Kérjük próbálja újra késöbb!');
      });
  }

  openConfirmDeleteModal(member: EventTeamMember) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { name: member.name, title: 'Csapat tag törlése' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventteamsservice
          .deleteEventTeamMember(member.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getTeamMembers();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A csapat tag törlése közben hiba lépett fel. Kérjük próbálja újra késöbb.');
          });
      }
    });
  }
}
