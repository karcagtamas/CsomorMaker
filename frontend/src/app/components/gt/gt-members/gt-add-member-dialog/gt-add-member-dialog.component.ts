import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GtMembersService } from 'src/app/services/gt-members.service';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-add-member-dialog',
  templateUrl: './gt-add-member-dialog.component.html',
  styleUrls: ['./gt-add-member-dialog.component.scss']
})
export class GtAddMemberDialogComponent implements OnInit {
  userControl = new FormControl('', [Validators.required]);
  nonMembers: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<GtAddMemberDialogComponent>,
    private gtmemberservice: GtMembersService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.gtmemberservice
      .getNonGtMembers(this.data)
      .then(res => {
        this.nonMembers = res;
      })
      .catch(() => {
        this.nonMembers = [];
      });
  }

  add() {
    if (!this.userControl.invalid) {
      this.dialogRef.close({ user: +this.userControl.value });
    } else {
      this.notificationservice.warning('A megadott felhasználó érvénytelen!');
    }
  }
}
