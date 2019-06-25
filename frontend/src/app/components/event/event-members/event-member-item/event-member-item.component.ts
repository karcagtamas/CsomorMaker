import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventMember } from 'src/app/models';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { ModifyEventMemberComponent } from '../modify-event-member/modify-event-member.component';

@Component({
  selector: 'app-event-member-item',
  templateUrl: './event-member-item.component.html',
  styleUrls: ['./event-member-item.component.scss']
})
export class EventMemberItemComponent implements OnInit {
  @Input() eventMember: EventMember;
  @Input() accessLevel: number;
  @Input() userId: number;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openModifyDialog() {
    const dialogRef = this.dialog.open(ModifyEventMemberComponent, {
      data: { eventMember: this.eventMember, accessLevel: this.accessLevel, userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit({ data: result.data });
      }
    });
  }

  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Esemény tag törlése', name: this.eventMember.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit({ id: this.eventMember.id });
      }
    });
  }
}
