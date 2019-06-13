import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/services';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  alert = '';
  success = false;
  nameControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(private eventservice: EventService) {}

  ngOnInit() {}

  addEvent() {
    if (this.nameControl.invalid) {
      this.setAlert('A megadott adat nem megfelelő!', false);
    } else {
      this.eventservice
        .addEvent(this.nameControl.value)
        .then(res => {
          if (res.response === 'add-event-success') {
            this.setAlert('Az esemény létrehozása siekres!', true);
          } else {
            this.setAlert('Az esemény hozzáadása sikertelen!', false);
          }
        })
        .catch(() => {
          this.setAlert('Az esemény hozzáadása sikertelen!', false);
        });
    }
  }

  setAlert(value: string, isSuccess: boolean) {
    this.alert = value;
    this.success = isSuccess;
    setTimeout(() => {
      this.alert = '';
    }, 3000);
  }
}
