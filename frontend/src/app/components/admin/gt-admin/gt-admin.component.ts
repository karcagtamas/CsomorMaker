import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Gt } from 'src/app/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-gt-admin',
  templateUrl: './gt-admin.component.html',
  styleUrls: ['./gt-admin.component.scss']
})
export class GtAdminComponent implements OnInit {
  gts: MatTableDataSource<Gt>;
  displayedColumns: string[] = [
    'year',
    'tShirtColor',
    'isDisabled',
    'creater',
    'lastUpdater',
    'greeny',
    'members',
    'creationDate',
    'lastUpdate'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private adminservice: AdminService, private notificationserivce: NotificationService) {}

  ngOnInit() {
    this.gts = new MatTableDataSource();
    this.getGts();
  }

  getGts() {
    this.adminservice
      .getAllGt()
      .then(res => {
        this.gts = new MatTableDataSource(res);
        this.gts.sort = this.sort;
        this.gts.paginator = this.paginator;
      })
      .catch(err => {
        this.gts = new MatTableDataSource();
      });
  }

  filtering(filter: string) {
    this.gts.filter = filter.trim().toLocaleLowerCase();

    if (this.gts.paginator) {
      this.gts.paginator.firstPage();
    }
  }

  updateArchiveStatus(gt: Gt) {
    this.adminservice
      .updateGtArchiveStatus(gt.id, gt.isDisabled)
      .then(res => {
        if (res.response === 'success') {
          this.notificationserivce.success(res.message);
        } else {
          this.notificationserivce.error(res.message);
        }
      })
      .catch(() => {
        this.notificationserivce.error(
          'A gólyatábor archív állapotának megváltoztatása közben hiba lépett fel! Kérjük próbálja újra késöbb!'
        );
      });
  }
}
