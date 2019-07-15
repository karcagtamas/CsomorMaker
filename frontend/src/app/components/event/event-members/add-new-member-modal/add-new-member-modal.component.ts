import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models';
import { EventMembersService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-add-new-member-modal',
  templateUrl: './add-new-member-modal.component.html',
  styleUrls: ['./add-new-member-modal.component.scss']
})
export class AddNewMemberModalComponent implements OnInit {
  userControl = new FormControl(['', Validators.required]);
  nonMembers: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddNewMemberModalComponent>,
    private eventmemberservice: EventMembersService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.eventmemberservice
      .getEventNonMembers(this.data)
      .then(res => {
        this.nonMembers = res;
      })
      .catch(() => {
        this.nonMembers = [];
      });
  }

  add() {
    if (!this.userControl.invalid) {
      this.dialogRef.close(+this.userControl.value);
    } else {
      this.notificationservice.warning('A megadott felhasználó érvénytelen!');
    }
  }
}
