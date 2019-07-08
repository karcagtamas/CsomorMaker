import { Component, OnInit, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { NotificationService, GtService } from 'src/app/services';
import { Gt } from 'src/app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gt-settings',
  templateUrl: './gt-settings.component.html',
  styleUrls: ['./gt-settings.component.scss']
})
export class GtSettingsComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  modifiedGt: Gt;
  form = new FormGroup({
    tShirtColor: new FormControl('', [Validators.required]),
    days: new FormControl('', [Validators.required]),
    greenyCost: new FormControl('', [Validators.required])
  });

  constructor(private notificationservice: NotificationService, private gtservice: GtService) {}

  ngOnInit() {}

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

      this.gtservice.updateGt(gt);
    }
  }
}
