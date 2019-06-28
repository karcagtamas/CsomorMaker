import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventWork } from 'src/app/models';
import { EventGeneratorService } from 'src/app/services';
import { EventWorkTable } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-work-settings',
  templateUrl: './work-settings.component.html',
  styleUrls: ['./work-settings.component.scss']
})
export class WorkSettingsComponent implements OnInit {
  @Input() work: EventWork;
  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter();
  workTables: EventWorkTable[] = [];

  constructor(private eventgeneratorservice: EventGeneratorService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getWorkTables();
  }

  getWorkTables() {
    this.eventgeneratorservice
      .getWorkTables(this.work.id)
      .then(res => {
        this.workTables = res;
      })
      .catch(() => {
        this.workTables = [];
      });
  }

  deleteWork() {
    this.delete.emit({ id: this.work.id });
  }

  saveWorkTable(day: number, hour: number, work: number) {
    this.save.emit({ day, hour, work });
  }

  openConfirmDeleteWorkDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Poszt törlése', name: this.work.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteWork();
      }
    });
  }
}
