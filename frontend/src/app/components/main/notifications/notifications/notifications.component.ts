import { Component, OnInit } from '@angular/core';
import { UserNotificationService } from 'src/app/services';
import { Notification } from 'src/app/models';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationservice: UserNotificationService) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationservice
      .getNotifications()
      .then(res => {
        this.notifications = res;
      })
      .catch(() => {
        this.notifications = [];
      });
  }
}
