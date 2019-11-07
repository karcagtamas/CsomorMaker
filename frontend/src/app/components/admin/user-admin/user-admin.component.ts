import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User, Role } from 'src/app/models';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService, UserService } from 'src/app/services';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  users: MatTableDataSource<User>;
  roles: Role[];
  userId = 0;
  displayedColumns: string[] = ['name', 'username', 'email', 'blocked', 'role', 'registrationTime', 'lastLogin'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private adminservice: AdminService,
    private notificationserivce: NotificationService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.getRoles();
    this.getUserId();
    this.users = new MatTableDataSource();
    this.getUsers();
  }

  filtering(filter: string) {
    this.users.filter = filter.trim().toLocaleLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  getUserId() {
    this.userservice
      .getId()
      .then(res => {
        this.userId = res;
      })
      .catch(() => {
        this.userId = 0;
      });
  }

  getUsers() {
    this.adminservice
      .getAllUser()
      .then(res => {
        this.users = new MatTableDataSource(res);
        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
      })
      .catch(() => (this.users = new MatTableDataSource([])));
  }

  getRoles() {
    this.userservice
      .getRoles()
      .then(res => {
        this.roles = res;
      })
      .catch(() => {
        this.roles = [];
      });
  }

  blockUser(user: User) {
    this.adminservice
      .blockUser(user.id, user.blocked)
      .then(res => {
        if (res.response === 'success') {
          this.notificationserivce.success(res.message);
        } else {
          this.notificationserivce.error(res.message);
        }
      })
      .catch(() => {
        this.notificationserivce.error(
          'A felhasználó tiltási állapotának megváltoztatása közben hiba lépett fel! Kérjük próbálja újra késöbb!'
        );
      });
  }

  changeRole(user: User) {
    this.adminservice
      .updateUserRole(user.id, user.roleId)
      .then(res => {
        if (res.response === 'success') {
          this.notificationserivce.success(res.message);
        } else {
          this.notificationserivce.error(res.message);
        }
      })
      .catch(() => {
        this.notificationserivce.error(
          'A felhasználó rangjánok megváltoztatása közben hiba lépett fel! Kérjük próbálja újra késöbb!'
        );
      });
  }
}
