import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;

  constructor() {}

  ngOnInit() {}
}
