import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GtRole } from 'src/app/models';
import { GtService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-role-modal',
  templateUrl: './gt-role-modal.component.html',
  styleUrls: ['./gt-role-modal.component.scss']
})
export class GtRoleModalComponent implements OnInit {
  isEdit = false;
  title = '';
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  levelControl = new FormControl('', [Validators.required]);
  levels = [1, 2, 3];

  constructor(
    public dialogRef: MatDialogRef<GtRoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GtRole,
    public dialog: MatDialog,
    private gtservice: GtService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.isEdit = this.data ? true : false;
    this.title = 'Rang létrehozása';
    if (this.isEdit) {
      this.nameControl.setValue(this.data.name);
      this.levelControl.setValue(this.data.accessLevel);
      this.title = 'Rang módosítása';
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (!this.nameControl.invalid && !this.levelControl.invalid) {
      this.dialogRef.close({ name: this.nameControl.value, accessLevel: this.levelControl.value });
    }
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { name: this.data.name, title: 'Rang törlése' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gtservice
          .deleteGtRole(this.data.id)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.dialogRef.close(false);
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A rang tag törlése közben hiba lépett fel. Kérjük próbálja újra késöbb.');
          });
      }
    });
  }
}
