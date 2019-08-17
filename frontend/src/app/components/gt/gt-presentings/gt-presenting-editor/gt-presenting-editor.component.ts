import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GtPresenting } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { GtPresentingEditorDialogComponent } from '../gt-presenting-editor-dialog/gt-presenting-editor-dialog.component';

@Component({
  selector: 'app-gt-presenting-editor',
  templateUrl: './gt-presenting-editor.component.html',
  styleUrls: ['./gt-presenting-editor.component.scss']
})
export class GtPresentingEditorComponent implements OnInit {
  @Input() presenting: GtPresenting;
  @Output() update = new EventEmitter();
  buttonTitle = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.buttonTitle = this.presenting.answer ? 'Bemutatás frissítése' : 'Bemutatás hozzáadása';
  }

  openEditorDialog() {
    const dialogRef = this.dialog.open(GtPresentingEditorDialogComponent, {
      data: this.presenting,
      minWidth: '80%',
      minHeight: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.update.emit({
          presented: this.presenting.presentedId,
          presenter: this.presenting.presenterId,
          answer: result.answer
        });
      }
    });
  }
}
