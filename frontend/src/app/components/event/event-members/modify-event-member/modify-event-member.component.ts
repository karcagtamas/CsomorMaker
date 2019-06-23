import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventMember, EventRole } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/services';

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
    @Inject(MAT_DIALOG_DATA) public data: EventMember,
    private eventservice: EventService
  ) {}

  ngOnInit() {
    this.eventservice
      .getEventRoles()
      .then(res => {
        this.eventRoles = res;
        this.roleControl.setValue(this.data.roleId);
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
      this.data.roleId = this.roleControl.value;
      this.dialogRef.close({ data: this.data });
    }
  }
}
