import { Component, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { NotificationService, GtService, GtGeneratorService } from 'src/app/services';
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
    private gtservice: GtService,
    private gtgeneratorservice: GtGeneratorService
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
      this.gtgeneratorservice.getGtWorks(this.gt.id).then(res => {
        const gt = this.modifiedGt;
        gt.tShirtColor = this.form.get('tShirtColor').value;
        gt.days = +this.form.get('days').value;
        gt.greenyCost = +this.form.get('greenyCost').value;
        const f = !!res.find(x => x.day > gt.days);

        if (f) {
          this.notificationservice.warning('Sajnos van egy poszt, ami kivül esne a határokon az új nap beállítással!');
        } else {
          this.gtservice
            .updateGt(gt)
            .then(res2 => {
              if (res2.response === 'success') {
                this.notificationservice.success(res2.message);
              } else {
                this.notificationservice.error(res2.message);
              }
            })
            .catch(() => {
              this.notificationservice.error(
                'A gólyatábor frissítése közben hiba történt! Kérjük próbálja újra késöbb!'
              );
            });
        }
      });
    }
  }
}
