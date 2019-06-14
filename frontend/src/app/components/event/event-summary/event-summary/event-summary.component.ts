import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/models';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {
  @Input() event: Event;
  playerSummary = 0;
  visitorSumamry = 0;

  constructor() {}

  ngOnInit() {
    this.setPlayerSummary();
    this.setVisitorSummary();
  }

  setPlayerSummary() {
    this.playerSummary = this.event.currentPlayers * this.event.playerCost;
  }

  setVisitorSummary() {
    this.visitorSumamry = this.event.visitors * this.event.visitorCost;
  }
}
