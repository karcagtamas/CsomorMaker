import { NewPayOutDialogComponent } from './../new-pay-out-dialog/new-pay-out-dialog.component';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Event, EventPayOut, EventPayOutType } from 'src/app/models';
import { EventService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { DeletePayOutDialogComponent } from '../delete-pay-out-dialog/delete-pay-out-dialog.component';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit, OnChanges {
  @Input() event: Event;
  @Output() alert = new EventEmitter();
  payOuts: EventPayOut[] = [];
  payOutTypes: EventPayOutType[] = [];
  playerSummary = 0;
  visitorSumamry = 0;
  summary = 0;

  constructor(private eventservice: EventService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getPayOuts();
    this.getPayOutTypes();
    this.setPlayerSummary();
    this.setVisitorSummary();
    this.setSummary();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getPayOuts();
    this.getPayOutTypes();
    this.setPlayerSummary();
    this.setVisitorSummary();
    this.setSummary();
  }

  getPayOuts() {
    this.eventservice
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
    this.eventservice
      .getPayOutTypes()
      .then(res => {
        this.payOutTypes = res;
      })
      .catch(() => {
        this.payOutTypes = [];
      });
  }

  setPlayerSummary() {
    this.playerSummary = this.event.currentPlayers * this.event.playerCost;
  }

  setVisitorSummary() {
    this.visitorSumamry = this.event.visitors * this.event.visitorCost;
  }

  setSummary() {
    this.summary = this.playerSummary + this.visitorSumamry;
    for (const i of this.payOuts) {
      if (i.isOut) {
        this.summary -= i.cost;
      } else {
        this.summary += +i.cost;
      }
    }
  }

  openNewPayOutDialog() {
    const dialogRef = this.dialog.open(NewPayOutDialogComponent, {
      data: this.payOutTypes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.eventId = this.event.id;
        this.eventservice
          .addPayout(result)
          .then(res => {
            if (res.response === 'add-payout-success') {
              this.alert.emit({ msg: 'A kiadás/bevétel hozzáadása sikeres volt!', isSuccess: true });
              this.payOuts.push(result);
              this.setSummary();
            } else {
              this.alert.emit({ msg: 'A kiadás/bevétel hozzáadása sikertelen volt!', isSuccess: false });
            }
          })
          .catch(() => {
            this.alert.emit({
              msg: 'A kiadás/bevétel hozzáadása közben hiba történt! Kérjük próbálja újra késöbb!',
              isSuccess: false
            });
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
        this.eventservice
          .deletePayout(+result)
          .then(res => {
            if (res.response === 'delete-payout-success') {
              this.alert.emit({ msg: 'A kiadás/bevétel törlése sikeres volt!', isSuccess: true });
              this.payOuts = this.payOuts.filter(x => x.id !== +result);
              this.setSummary();
            } else {
              this.alert.emit({ msg: 'A kiadás/bevétel törlése sikertelen volt!', isSuccess: false });
            }
          })
          .catch(() => {
            this.alert.emit({
              msg: 'A kiadás/bevétel törlése közben hiba történt! Kérjük próbálja újra késöbb!',
              isSuccess: false
            });
          });
      }
    });
  }
}
