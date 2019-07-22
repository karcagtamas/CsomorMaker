import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { UserModifyDialogComponent } from '../user-modify-dialog/user-modify-dialog.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user: User;

  constructor(
    private userservice: UserService,
    public dialog: MatDialog,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userservice
      .getId()
      .then(res => {
        this.userservice
          .getUser(res)
          .then(res2 => {
            this.user = res2;
          })
          .catch(() => {
            this.user = null;
          });
      })
      .catch(() => {
        this.user = null;
      });
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userservice
          .changePassword(this.user.id, result.password)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error('A jelszó csere közben hiba történt! Kérjük próbálja meg újra késöbb!');
          });
      }
    });
  }

  openModifyDialog() {
    const dialogRef = this.dialog.open(UserModifyDialogComponent, {
      data: this.user,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userservice
          .updateUser(this.user.id, result.name)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.getUser();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error(
              'A felhasználó adatainak frissítése közben hiba történt! Kérjük próbálja meg újra késöbb!'
            );
          });
      }
    });
  }
}
