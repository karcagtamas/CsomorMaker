import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/services';
import { Gt } from 'src/app/models';

@Component({
  selector: 'app-gt-details',
  templateUrl: './gt-details.component.html',
  styleUrls: ['./gt-details.component.scss']
})
export class GtDetailsComponent implements OnInit {
  @Input() gt: Gt;
  @Input() accessLevel: number;
  @Output() lock = new EventEmitter();

  constructor(private notificationservice: NotificationService) {}

  ngOnInit() {}

  lockGt() {
    this.lock.emit({ id: this.gt.id });
  }
}
