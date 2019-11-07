import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from 'src/app/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-event-admin',
  templateUrl: './event-admin.component.html',
  styleUrls: ['./event-admin.component.scss']
})
export class EventAdminComponent implements OnInit {
  events: MatTableDataSource<Event>;
  displayedColumns: string[] = [
    'name',
    'isDisabled',
    'creater',
    'lastUpdater',
    'currentPlayers',
    'visitors',
    'members',
    'creationDate',
    'lastUpdate'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminservice: AdminService, private notificationserivce: NotificationService) {}

  ngOnInit() {
    this.events = new MatTableDataSource();
    this.getEvents();
  }

  getEvents() {
    this.adminservice
      .getAllEvents()
      .then(res => {
        this.events = new MatTableDataSource(res);
        this.events.sort = this.sort;
        this.events.paginator = this.paginator;
      })
      .catch(err => {
        this.events = new MatTableDataSource();
      });
  }

  filtering(filter: string) {
    this.events.filter = filter.trim().toLocaleLowerCase();

    if (this.events.paginator) {
      this.events.paginator.firstPage();
    }
  }

  updateArchiveStatus(event: Event) {
    this.adminservice
      .updateEventArchiveStatus(event.id, event.isDisabled)
      .then(res => {
        if (res.response === 'success') {
          this.notificationserivce.success(res.message);
        } else {
          this.notificationserivce.error(res.message);
        }
      })
      .catch(() => {
        this.notificationserivce.error(
          'Az esemény archív állapotának megváltoztatása közben hiba lépett fel! Kérjük próbálja újra késöbb!'
        );
      });
  }
}
