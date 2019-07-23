import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, EventPayOutType, GtPayout } from 'src/app/models';
import { GtPayoutsService, NotificationService, EventPayOutsService, GtService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { GtPayoutDialogComponent } from '../gt-payout-dialog/gt-payout-dialog.component';

@Component({
  selector: 'app-gt-summary',
  templateUrl: './gt-summary.component.html',
  styleUrls: ['./gt-summary.component.scss']
})
export class GtSummaryComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  payOuts: GtPayout[] = [];
  payOutTypes: EventPayOutType[] = [];
  summary = 0;
  greenySummary = 0;
  countOfCosts = 0;

  constructor(
    private gtpayoutsservice: GtPayoutsService,
    private eventpayoutsservice: EventPayOutsService,
    public dialog: MatDialog,
    private notificationservice: NotificationService,
    private gtservice: GtService
  ) {}

  ngOnInit() {
    this.getPayOuts();
    this.getPayOutTypes();
    this.getCountOfCost();
    this.setGreenySummary();
    this.setSummary();
  }

  ngOnChanges() {
    this.getPayOuts();
    this.getCountOfCost();
    this.setGreenySummary();
    this.setSummary();
  }

  getPayOuts() {
    this.gtpayoutsservice
      .getGtPayouts(this.gt.id)
      .then(res => {
        this.payOuts = res;
        this.setSummary();
      })
      .catch(() => {
        this.payOuts = [];
      });
  }

  getPayOutTypes() {
    this.eventpayoutsservice
      .getPayOutTypes()
      .then(res => {
        this.payOutTypes = res;
      })
      .catch(() => {
        this.payOutTypes = [];
      });
  }

  getCountOfCost() {
    this.gtservice
      .countOfAllPaid(this.gt.id)
      .then(res => {
        this.countOfCosts = res.countOfCosts;
        this.setGreenySummary();
      })
      .catch(() => {
        this.countOfCosts = 0;
      });
  }

  setGreenySummary() {
    this.greenySummary = this.gt.greenyCost * this.countOfCosts;
    this.setSummary();
  }

  setSummary() {
    let summary = this.greenySummary;
    for (const i of this.payOuts) {
      if (i.isOut) {
        summary -= i.cost;
      } else {
        summary += +i.cost;
      }
    }
    this.summary = summary;
  }

  openPayOutDialog(payout?: GtPayout) {
    const dialogRef = this.dialog.open(GtPayoutDialogComponent, {
      data: { payOutTypes: this.payOutTypes, payOut: payout ? payout : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.refresh) {
          if (payout) {
            this.gtpayoutsservice
              .updateGtPayout(payout.id, result.name, result.type, result.cost, result.from, result.to)
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
            this.gtpayoutsservice
              .addGtPayout(this.gt.id, result.name, result.type, result.cost, result.from, result.to)
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
