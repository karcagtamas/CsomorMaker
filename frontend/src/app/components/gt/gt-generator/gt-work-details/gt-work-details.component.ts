import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Gt, GtWork } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gt-work-details',
  templateUrl: './gt-work-details.component.html',
  styleUrls: ['./gt-work-details.component.scss']
})
export class GtWorkDetailsComponent implements OnInit {
  @Input() work: GtWork;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  deleteWork() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Poszt törlése', name: this.work.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit({ id: this.work.id });
      }
    });
  }

  updateWork() {
    this.update.emit({ work: this.work });
  }
}
