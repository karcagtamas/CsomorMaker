import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GtMember, Gt } from 'src/app/models';
import { GtPresentingServiceService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-presenting-dialog',
  templateUrl: './gt-presenting-dialog.component.html',
  styleUrls: ['./gt-presenting-dialog.component.scss']
})
export class GtPresentingDialogComponent implements OnInit {
  form: FormGroup;
  list1: GtMember[] = [];
  list2: GtMember[] = [];
  members: GtMember[];

  constructor(
    public dialogRef: MatDialogRef<GtPresentingDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { members: GtMember[]; gt: Gt },
    private gtpresentingsservice: GtPresentingServiceService,
    private notificatinservice: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ user1: ['', [Validators.required]], user2: ['', [Validators.required]] });
    this.members = this.data.members;
    this.list1 = this.members;
    this.list2 = this.members;
  }

  user1Change() {
    this.list2 = this.members.filter(x => x.userId !== +this.form.get('user1'));
    this.gtpresentingsservice.getGtPresentingForUser(this.data.gt.id, +this.form.get('user1').value).then(res => {
      for (const i of res) {
        this.list2 = this.list2.filter(x => x.userId !== i.presentedId);
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.invalid) {
      this.notificatinservice.warning('Nem megfelelő adatok!');
    } else {
      this.dialogRef.close({ user1: this.form.get('user1').value, user2: this.form.get('user2').value });
    }
  }
}
