import { Component, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { NotificationService, GtService } from 'src/app/services';
import { Gt } from 'src/app/models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gt-settings',
  templateUrl: './gt-settings.component.html',
  styleUrls: ['./gt-settings.component.scss']
})
export class GtSettingsComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  modifiedGt: Gt;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationservice: NotificationService,
    private gtservice: GtService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tShirtColor: ['', Validators.required],
      days: ['', Validators.required],
      greenyCost: ['', Validators.required]
    });
    this.setValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.modifiedGt = { ...this.gt };
    this.setValues();
  }

  setValues() {
    const gt = this.modifiedGt;
    this.form.setValue({ tShirtColor: gt.tShirtColor, days: gt.days, greenyCost: gt.greenyCost });
  }

  reset() {
    this.modifiedGt = { ...this.gt };
    this.setValues();
  }

  save() {
    if (this.form.invalid) {
      this.notificationservice.warning('Nem megfelelő adatok!');
    } else {
      const gt = this.modifiedGt;
      gt.tShirtColor = this.form.get('tShirtColor').value;
      gt.days = +this.form.get('days').value;
      gt.greenyCost = +this.form.get('greenyCost').value;

      this.gtservice
        .updateGt(gt)
        .then(res => {
          if (res.response === 'success') {
            this.notificationservice.success(res.message);
          } else {
            this.notificationservice.error(res.message);
          }
        })
        .catch(() => {
          this.notificationservice.error('A gólyatábor frissítése közben hiba történt! Kérjük próbálja újra késöbb!');
        });
    }
  }
}
