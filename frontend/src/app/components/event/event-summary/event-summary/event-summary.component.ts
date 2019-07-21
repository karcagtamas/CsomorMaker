import { NewPayOutDialogComponent } from './../new-pay-out-dialog/new-pay-out-dialog.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event, EventPayOut, EventPayOutType } from 'src/app/models';
import { NotificationService, EventPayOutsService, EventService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { DeletePayOutDialogComponent } from '../delete-pay-out-dialog/delete-pay-out-dialog.component';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit, OnChanges {
  @Input() event: Event;
  payOuts: EventPayOut[] = [];
  payOutTypes: EventPayOutType[] = [];
  playerSummary = 0;
  visitorSumamry = 0;
  summary = 0;
  countOfCosts = 0;
  countOfDeposits = 0;

  constructor(
    private eventpayoutservice: EventPayOutsService,
    public dialog: MatDialog,
    private notificationservice: NotificationService,
    private eventservice: EventService
  ) {}

  ngOnInit() {
    this.getPayOuts();
    this.getPayOutTypes();
    this.getCountOfCost();
    this.setVisitorSummary();
    this.setSummary();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPayOuts();
    this.getCountOfCost();
    this.setVisitorSummary();
    this.setSummary();
  }

  getPayOuts() {
    this.eventpayoutservice
      .getPayOuts(this.event.id)
      .then(res => {
        this.payOuts = res;
        this.setSummary();
      })
      .catch(() => {
        this.payOuts = [];
      });
  }

  getPayOutTypes() {
    this.eventpayoutservice
      .getPayOutTypes()
      .then(res => {
        this.payOutTypes = res;
      })
      .catch(() => {
        this.payOutTypes = [];
      });
  }

  getCountOfCost() {
    this.eventservice
      .countOfAllCost(this.event.id)
      .then(res => {
        this.countOfCosts = res.countOfCosts;
        this.countOfDeposits = res.countOfDeposits;
        this.setPlayerSummary();
      })
      .catch(() => {
        this.countOfCosts = 0;
      });
  }

  setPlayerSummary() {
    this.playerSummary = this.countOfCosts * this.event.playerCost + this.countOfDeposits * this.event.playerDeposit;
    this.setSummary();
  }

  setVisitorSummary() {
    this.visitorSumamry = this.event.visitors * this.event.visitorCost;
  }

  setSummary() {
    let summary = this.playerSummary + this.visitorSumamry;
    for (const i of this.payOuts) {
      if (i.isOut) {
        summary -= i.cost;
      } else {
        summary += +i.cost;
      }
    }
    this.summary = summary;
  }

  openNewPayOutDialog() {
    const dialogRef = this.dialog.open(NewPayOutDialogComponent, {
      data: this.payOutTypes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.eventId = this.event.id;
        this.eventpayoutservice
          .addPayout(result)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.payOuts.push(result);
              this.setSummary();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error(
              'A kiadás/bevétel hozzáadása közben hiba történt! Kérjük próbálja újra késöbb!'
            );
          });
      }
    });
  }

  openDeletePayOutDialog() {
    const dialogRef = this.dialog.open(DeletePayOutDialogComponent, {
      data: this.payOuts
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && +result !== 0) {
        this.eventpayoutservice
          .deletePayout(+result)
          .then(res => {
            if (res.response === 'success') {
              this.notificationservice.success(res.message);
              this.payOuts = this.payOuts.filter(x => x.id !== +result);
              this.setSummary();
            } else {
              this.notificationservice.error(res.message);
            }
          })
          .catch(() => {
            this.notificationservice.error(
              'A kiadás/bevétel törlése közben hiba történt! Kérjük próbálja újra késöbb!'
            );
          });
      }
    });
  }
}
