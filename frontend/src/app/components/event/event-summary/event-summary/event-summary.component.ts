import { NewPayOutDialogComponent } from './../new-pay-out-dialog/new-pay-out-dialog.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event, EventPayOut, EventPayOutType } from 'src/app/models';
import { NotificationService, EventPayOutsService, EventService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { DeletePayOutDialogComponent } from '../delete-pay-out-dialog/delete-pay-out-dialog.component';
import { EventPayoutDialogComponent } from '../event-payout-dialog/event-payout-dialog.component';

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

  openPayOutDialog(payout?: EventPayOut) {
    const dialogRef = this.dialog.open(EventPayoutDialogComponent, {
      data: { payOutTypes: this.payOutTypes, payOut: payout ? payout : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.refresh) {
          if (payout) {
            result.id = payout.id;
            this.eventpayoutservice
              .updatePayout(result)
              .then(res => {
                if (res.response === 'success') {
                  this.notificationservice.success(res.message);
                  this.getPayOuts();
                } else {
                  this.notificationservice.error(res.message);
                }
              })
              .catch(() => {
                this.notificationservice.error(
                  'A kiadás/bevétel frissítése közben hiba történt! Kérjük próbálja újra késöbb!'
                );
              });
          } else {
            result.eventId = this.event.id;
            this.eventpayoutservice
              .addPayout(result)
              .then(res => {
                if (res.response === 'success') {
                  this.notificationservice.success(res.message);
                  this.payOuts.push(result);
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
        } else {
          this.getPayOuts();
        }
      }
    });
  }
}
