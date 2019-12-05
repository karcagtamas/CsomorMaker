import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventRole, Event } from 'src/app/models';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EventService, NotificationService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { EventRoleModalComponent } from '../event-role-modal/event-role-modal.component';

@Component({
  selector: 'app-event-roles',
  templateUrl: './event-roles.component.html',
  styleUrls: ['./event-roles.component.scss']
})
export class EventRolesComponent implements OnInit {
  @Input() event: Event;
  eventRoles: MatTableDataSource<EventRole>;
  displayedColumns: string[] = ['name', 'accessLevel'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private eventserivce: EventService,
    private notificationservice: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.eventRoles = new MatTableDataSource();
    this.getEventRoles();
  }

  getEventRoles() {
    this.eventserivce
      .getEventRoles(this.event.id)
      .then(res => {
        this.eventRoles = new MatTableDataSource(res);
        this.eventRoles.sort = this.sort;
        this.eventRoles.paginator = this.paginator;
      })
      .catch(err => {
        this.eventRoles = new MatTableDataSource();
      });
  }

  filtering(filter: string) {
    this.eventRoles.filter = filter.trim().toLocaleLowerCase();

    if (this.eventRoles.paginator) {
      this.eventRoles.paginator.firstPage();
    }
  }

  openModal(role?: EventRole) {
    if (role && (role.name === 'Főszervező' || role.name === 'Posztfőszervező' || role.name === 'Humán')) {
      return;
    }
    const dialogRef = this.dialog.open(EventRoleModalComponent, {
      data: role ? role : null,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (role) {
          this.eventserivce
            .updateEventRole(role.id, result.name, result.accessLevel)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getEventRoles();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A frissítése közben hibatörtént. Kérjük próbálja újra késöbb!');
            });
        } else {
          this.eventserivce
            .addEventRole(this.event.id, result.name, result.accessLevel)
            .then(res => {
              if (res.response === 'success') {
                this.notificationservice.success(res.message);
                this.getEventRoles();
              } else {
                this.notificationservice.error(res.message);
              }
            })
            .catch(() => {
              this.notificationservice.error('A létrehozás közben hibatörtént. Kérjük próbálja újra késöbb!');
            });
        }
      } else if (result === false) {
        this.getEventRoles();
      }
    });
  }
}
