import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Gt, GtMessage } from 'src/app/models';
import { UserService, NotificationService, GtMessagesService } from 'src/app/services';

@Component({
  selector: 'app-gt-chat',
  templateUrl: './gt-chat.component.html',
  styleUrls: ['./gt-chat.component.scss']
})
export class GtChatComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  gtMessages: GtMessage[] = [];
  message = '';
  userId = 0;

  constructor(
    private gtmessagesservice: GtMessagesService,
    private userservice: UserService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {
    this.getGtMessages();
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
    this.getGtMessages();
  }

  getGtMessages() {
    this.gtmessagesservice
      .getGtMessages(this.gt.id)
      .then(res => {
        this.gtMessages = res;
      })
      .catch(() => {
        this.gtMessages = [];
      });
  }

  sendMessage() {
    if (this.message) {
      this.gtmessagesservice
        .addGtMessage(this.gt.id, this.message)
        .then(res => {
          if (res.response === 'success') {
            this.notificationservice.success(res.message);
            this.message = '';
            this.getGtMessages();
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
