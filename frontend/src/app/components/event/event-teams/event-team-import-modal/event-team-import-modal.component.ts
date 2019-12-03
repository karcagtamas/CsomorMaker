import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventTeamsService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-event-team-import-modal',
  templateUrl: './event-team-import-modal.component.html',
  styleUrls: ['./event-team-import-modal.component.scss']
})
export class EventTeamImportModalComponent implements OnInit {
  fileToUpload: File = null;

  constructor(
    public dialogRef: MatDialogRef<EventTeamImportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private eventteamservice: EventTeamsService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }

  save() {
    if (this.fileToUpload) {
      this.uploadFileToActivity();
    }
  }

  handleFileInput(files: FileList, inp: HTMLInputElement) {
    console.log(files.item(0).type);
    if (files.item(0).type === 'application/vnd.ms-excel') {
      this.fileToUpload = files.item(0);
    } else {
      this.notificationservice.warning('Csak a .csv formátum a megengedett!');
      inp.value = '';
    }
  }

  uploadFileToActivity() {
    this.eventteamservice
      .postFile(this.fileToUpload, this.data)
      .then(data => {
        this.dialogRef.close(true);
      })
      .catch(err => {
        this.notificationservice.error('A feltöltés során hiba történt!');
      });
  }
}
