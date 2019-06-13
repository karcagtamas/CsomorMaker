import { Event } from 'src/app/models';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  @Input() event: Event;
  @Output() lock = new EventEmitter();
  @Output() increaseVisitors = new EventEmitter();
  @Output() decreaseVisitors = new EventEmitter();
  @Output() increaseInjured = new EventEmitter();
  @Output() decreaseInjured = new EventEmitter();
  @Output() alert = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  lockEvent() {
    this.lock.emit({ id: this.event.id });
  }

  increaseV() {
    if (this.event.visitors === this.event.visitorLimit) {
      this.alert.emit({ msg: 'Elérte a nézői limitet!' });
    } else {
      this.increaseVisitors.emit({ id: this.event.id });
    }
  }

  decreaseV() {
    if (this.event.visitors === 0) {
      this.alert.emit({ msg: 'Nullánál kevesebb nézője nem lehet!' });
    } else {
      this.decreaseVisitors.emit({ id: this.event.id });
    }
  }

  increaseI() {
    this.increaseInjured.emit({ id: this.event.id });
  }

  decreaseI() {
    if (this.event.injured === 0) {
      this.alert.emit({ msg: 'Nullánál kevesebb sérültje nem lehet!' });
    } else {
      this.decreaseInjured.emit({ id: this.event.id });
    }
  }
}
