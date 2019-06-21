import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventMember, Event } from 'src/app/models';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.component.html',
  styleUrls: ['./event-members.component.scss']
})
export class EventMembersComponent implements OnInit, OnChanges {
  @Input() event: Event;
  filterValue = '';
  displayedColumns: string[] = ['name', 'role', 'connectionDate', 'actions'];
  dataSource: MatTableDataSource<EventMember>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private eventservice: EventService) {}

  ngOnInit() {
    this.getEventMembers();
  }

  ngOnChanges() {
    this.getEventMembers();
  }

  getEventMembers() {
    this.eventservice.getEventMembers(this.event.id).then(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filter() {}
}
