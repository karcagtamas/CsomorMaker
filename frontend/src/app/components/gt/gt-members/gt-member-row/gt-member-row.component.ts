import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GtMember } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { GtMemberModifyDialogComponent } from '../gt-member-modify-dialog/gt-member-modify-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-member-row',
  templateUrl: './gt-member-row.component.html',
  styleUrls: ['./gt-member-row.component.scss']
})
export class GtMemberRowComponent implements OnInit {
  @Input() gtMember: GtMember;
  @Input() accessLevel: number;
  @Input() userId: number;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openModifyDialog() {
    const dialogRef = this.dialog.open(GtMemberModifyDialogComponent, {
      data: { eventMember: this.gtMember, accessLevel: this.accessLevel, userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit({ user: result.data.user, role: result.data.role });
      }
    });
  }

  openDeleteConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Gólyatábor tag törlése', name: this.gtMember.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit({ id: this.gtMember.userId });
      }
    });
  }
}
