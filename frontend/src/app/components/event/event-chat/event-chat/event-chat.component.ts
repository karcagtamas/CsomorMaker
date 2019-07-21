import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventMessage, Event } from 'src/app/models';
import { EventMessagesService, NotificationService, UserService } from 'src/app/services';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.scss']
})
export class EventChatComponent implements OnInit, OnChanges {
  @Input() event: Event;
  eventMessages: EventMessage[] = [];
  message = '';
  userId = 0;

  constructor(
    private eventmessagesservice: EventMessagesService,
    private userservice: UserService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getEventMessages();
    this.userservice
      .getId()
      .then(res => {
        this.userId = res;
      })
      .catch(() => {
        this.userId = 0;
      });
  }

  ngOnChanges() {
    this.getEventMessages();
  }

  getEventMessages() {
    this.eventmessagesservice
      .getEventMessages(this.event.id)
      .then(res => {
        this.eventMessages = res;
      })
      .catch(() => {
        this.eventMessages = [];
      });
  }

  sendMessage() {
    if (this.message) {
      this.eventmessagesservice
        .addEventMessage(this.event.id, this.message)
        .then(res => {
          if (res.response === 'success') {
            this.notificationservice.success(res.message);
            this.message = '';
            this.getEventMessages();
          } else {
            this.notificationservice.error(res.message);
          }
        })
        .catch(() => {
          this.notificationservice.error('Az üzenet küldése sikertelen! Kérjük próbálja újra késöbb!');
        });
    } else {
      this.notificationservice.warning('Nem megfelelő üzenet formátum!');
    }
  }
}
