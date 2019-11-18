import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event, EventPayOut, EventPayOutType } from 'src/app/models';
import { NotificationService, EventPayOutsService, EventService, EventTeamsService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
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
  countOfFixCosts = 0;
  countOfFixDeposits = 0;

  constructor(
    private eventpayoutservice: EventPayOutsService,
    public dialog: MatDialog,
    private notificationservice: NotificationService,
    private eventservice: EventService,
    private eventteamservice: EventTeamsService
  ) {}

  ngOnInit() {
    this.getPayOutTypes();
    this.getPayOuts();
    if (this.event.fixTeamCost) {
      this.getCountOfFixCosts();
    } else {
      this.getCountOfCost();
    }
    this.setVisitorSummary();
    this.setSummary();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPayOuts();
    if (this.event.fixTeamCost) {
      this.getCountOfFixCosts();
    } else {
      this.getCountOfCost();
    }
  }

  getPayOuts() {
    this.eventpayoutservice
      .getPayOuts(this.event.id)
      .then(res => {
        this.payOuts = res;
        this.setVisitorSummary();
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
        this.setSummary();
      })
      .catch(() => {
        this.countOfCosts = 0;
        this.countOfDeposits = 0;
      });
  }

  getCountOfFixCosts() {
    this.eventteamservice
      .getCountOFixCostsAndDeposits(this.event.id)
      .then(res => {
        this.countOfFixCosts = res.countOfCost;
        this.countOfFixDeposits = res.countOfDeposit;
        this.setPlayerSummary();
        this.setSummary();
      })
      .catch(() => {
        this.countOfFixDeposits = 0;
        this.countOfFixCosts = 0;
      });
  }

  setPlayerSummary() {
    if (this.event.fixTeamCost) {
      this.playerSummary =
        this.countOfFixCosts * this.event.fixTeamCost + this.countOfFixDeposits * this.event.fixTeamDeposit;
    } else {
      this.playerSummary = this.countOfCosts * this.event.playerCost + this.countOfDeposits * this.event.playerDeposit;
    }
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
