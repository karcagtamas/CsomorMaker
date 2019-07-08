import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GtService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-new-gt',
  templateUrl: './new-gt.component.html',
  styleUrls: ['./new-gt.component.scss']
})
export class NewGtComponent implements OnInit {
  yearControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(private gtservice: GtService, private notificationservice: NotificationService) {}

  ngOnInit() {}

  addGt() {
    if (this.yearControl.invalid) {
      this.notificationservice.warning('Nem megfelelő évszém!');
    } else {
      this.gtservice
        .addGt(+this.yearControl.value)
        .then(res => {
          if (res.response === 'success') {
            this.notificationservice.success(res.message);
            this.yearControl.setValue('');
          } else {
            this.notificationservice.error(res.message);
          }
        })
        .catch(() => {
          this.notificationservice.error('A gólyatábor létrehozása közben hiba történt! Próbálja késöbb újra!');
        });
    }
  }
}
