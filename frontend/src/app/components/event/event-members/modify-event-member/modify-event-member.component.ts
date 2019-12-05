import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventMember, EventRole } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';
import { EventService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-modify-event-member',
  templateUrl: './modify-event-member.component.html',
  styleUrls: ['./modify-event-member.component.scss']
})
export class ModifyEventMemberComponent implements OnInit {
  roleControl = new FormControl('', Validators.required);
  eventRoles: EventRole[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModifyEventMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventMember: EventMember; accessLevel: number; userId: number },
    private eventservice: EventService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.eventservice
      .getEventRoles(this.data.eventMember.event)
      .then(res => {
        this.eventRoles = res;
        this.roleControl.setValue(this.data.eventMember.roleId);
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
      this.data.eventMember.roleId = this.roleControl.value;
      this.dialogRef.close({ data: this.data.eventMember });
    } else {
      this.notificationservice.warning('A megadott rang érvénytelen!');
    }
  }
}
