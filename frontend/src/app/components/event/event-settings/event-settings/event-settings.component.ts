import { Event } from 'src/app/models';
import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services';

@Component({
  selector: 'app-event-settings',
  templateUrl: './event-settings.component.html',
  styleUrls: ['./event-settings.component.scss']
})
export class EventSettingsComponent implements OnInit, OnChanges {
  @Input() event: Event = new Event();
  @Output() update = new EventEmitter();
  modifiedEvent: Event;
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  visitorsControl = new FormControl('', [Validators.required, Validators.min(0)]);
  visitorLimitControl = new FormControl('', [Validators.required, Validators.min(0)]);
  playerCostControl = new FormControl('', [Validators.required, Validators.min(0)]);
  visitorCostControl = new FormControl('', [Validators.required, Validators.min(0)]);
  playerDepositControl = new FormControl('', [Validators.required, Validators.min(0)]);
  daysControl = new FormControl('', [Validators.required, Validators.min(0)]);
  startHourControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(23)]);
  endHourControl = new FormControl('', [Validators.required, Validators.min(0), Validators.max(23)]);
  injuredControl = new FormControl('', [Validators.required, Validators.min(0)]);
  startDateControl = new FormControl('');

  constructor(private notificationservice: NotificationService) {}

  ngOnInit() {
    this.modifiedEvent = { ...this.event };
    this.setValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.modifiedEvent = { ...this.event };
    this.setValues();
  }

  setValues() {
    const event = this.modifiedEvent;
    this.nameControl.setValue(event.name);
    this.visitorsControl.setValue(event.visitors);
    this.visitorsControl.setValidators(Validators.max(event.visitorLimit));
    this.visitorLimitControl.setValue(event.visitorLimit);
    this.playerCostControl.setValue(event.playerCost);
    this.visitorCostControl.setValue(event.visitorCost);
    this.playerDepositControl.setValue(event.playerDeposit);
    this.daysControl.setValue(event.days);
    this.startHourControl.setValue(event.startHour);
    this.endHourControl.setValue(event.endHour);
    this.injuredControl.setValue(event.injured);
    this.startDateControl.setValue(event.startDate);
  }

  reset() {
    this.modifiedEvent = { ...this.event };
    this.setValues();
  }

  changeVisitorLimit() {
    this.visitorsControl.setValidators(Validators.max(+this.visitorLimitControl.value));
  }

  save() {
    if (
      this.nameControl.invalid ||
      this.visitorsControl.invalid ||
      this.visitorLimitControl.invalid ||
      this.playerCostControl.invalid ||
      this.visitorCostControl.invalid ||
      this.playerDepositControl.invalid ||
      this.daysControl.invalid ||
      this.startHourControl.invalid ||
      this.endHourControl.invalid ||
      this.injuredControl.invalid
    ) {
      this.notificationservice.error('Nem megfelelő adatok!');
    } else {
      const event = this.modifiedEvent;
      event.name = this.nameControl.value;
      event.visitors = this.visitorsControl.value;
      event.visitorLimit = this.visitorLimitControl.value;
      event.playerCost = this.playerCostControl.value;
      event.visitorCost = this.visitorCostControl.value;
      event.playerDeposit = this.playerDepositControl.value;
      event.days = this.daysControl.value;
      event.startHour = this.startHourControl.value;
      event.endHour = this.endHourControl.value;
      event.injured = this.injuredControl.value;
      if (this.startDateControl.value) {
        event.startDate = new Date(this.startDateControl.value);
        event.startDate.setHours(12);
      }
      this.update.emit({ event });
    }
  }
}
