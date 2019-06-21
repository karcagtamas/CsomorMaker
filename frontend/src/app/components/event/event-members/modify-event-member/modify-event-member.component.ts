import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventMember } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-event-member',
  templateUrl: './modify-event-member.component.html',
  styleUrls: ['./modify-event-member.component.scss']
})
export class ModifyEventMemberComponent implements OnInit {
  roleControl = new FormControl('', Validators.required);
  eventRoles = [];

  constructor(
    public dialogRef: MatDialogRef<ModifyEventMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventMember
  ) {}

  ngOnInit() {}

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
