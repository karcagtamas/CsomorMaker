import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { EventRole, GtMember } from 'src/app/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-member-modify-dialog',
  templateUrl: './gt-member-modify-dialog.component.html',
  styleUrls: ['./gt-member-modify-dialog.component.scss']
})
export class GtMemberModifyDialogComponent implements OnInit {
  roleControl = new FormControl('', [Validators.required]);
  eventRoles: EventRole[] = [];

  constructor(
    public dialogRef: MatDialogRef<GtMemberModifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { gtMember: GtMember; accessLevel: number; userId: number },
    private eventservice: EventService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.eventservice
      .getEventRoles()
      .then(res => {
        this.eventRoles = res;
        this.roleControl.setValue(this.data.gtMember.roleId);
      })
      .catch(() => {
        this.eventRoles = [];
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (!this.roleControl.invalid) {
      this.data.gtMember.roleId = this.roleControl.value;
      this.dialogRef.close({ data: this.data.gtMember });
    } else {
      this.notificationservice.warning('A megadott rang érvénytelen!');
    }
  }
}
