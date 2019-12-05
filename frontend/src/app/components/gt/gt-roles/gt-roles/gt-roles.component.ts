import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GtRole, Gt } from 'src/app/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GtService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtRoleModalComponent } from '../gt-role-modal/gt-role-modal.component';

@Component({
  selector: 'app-gt-roles',
  templateUrl: './gt-roles.component.html',
  styleUrls: ['./gt-roles.component.scss']
})
export class GtRolesComponent implements OnInit {
  @Input() gt: Gt;
  gtRoles: MatTableDataSource<GtRole>;
  displayedColumns: string[] = ['name', 'accessLevel'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private gtservice: GtService,
    private notificationservice: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.gtRoles = new MatTableDataSource();
    this.getGtRoles();
  }

  getGtRoles() {
    this.gtservice
      .getGtRoles(this.gt.id)
      .then(res => {
        this.gtRoles = new MatTableDataSource(res);
        this.gtRoles.sort = this.sort;
        this.gtRoles.paginator = this.paginator;
      })
      .catch(err => {
        this.gtRoles = new MatTableDataSource();
      });
  }

  filtering(filter: string) {
    this.gtRoles.filter = filter.trim().toLocaleLowerCase();

    if (this.gtRoles.paginator) {
      this.gtRoles.paginator.firstPage();
    }
  }

  openModal(role?: GtRole) {
    if (role && (role.name === 'Főszervező' || role.name === 'Posztfőszervező' || role.name === 'Humán')) {
      return;
    }
    const dialogRef = this.dialog.open(GtRoleModalComponent, {
      data: role ? role : null,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (role) {
          this.gtservice
            .updateGtRole(role.id, result.name, result.accessLevel)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getGtRoles();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A frissítése közben hibatörtént. Kérjük próbálja újra késöbb!');
            });
        } else {
          this.gtservice
            .addGtRole(this.gt.id, result.name, result.accessLevel)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getGtRoles();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A létrehozás közben hibatörtént. Kérjük próbálja újra késöbb!');
            });
        }
      } else if (result === false) {
        this.getGtRoles();
      }
    });
  }
}
