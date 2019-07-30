import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-news-element',
  templateUrl: './news-element.component.html',
  styleUrls: ['./news-element.component.scss']
})
export class NewsElementComponent implements OnInit {
  @Input() news: News;
  @Input() accessLevel: number;
  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  deleteNews() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Hír törlése', name: 'hír' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit({ id: this.news.id });
      }
    });
  }

  updateNews() {
    this.update.emit({ news: this.news });
  }
}
