import { GtClassesService } from 'src/app/services';
import { Gt, GtClass } from 'src/app/models';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-gt-classes',
  templateUrl: './gt-classes.component.html',
  styleUrls: ['./gt-classes.component.scss']
})
export class GtClassesComponent implements OnInit, OnChanges {
  @Input() gt: Gt;
  gtClasses: GtClass[] = [];

  constructor(private gtclassesservice: GtClassesService) {}

  ngOnInit() {
    this.getClasses();
  }

  ngOnChanges() {
    this.getClasses();
  }

  getClasses() {
    this.gtclassesservice
      .getGtClasses(this.gt.id)
      .then(res => {
        this.gtClasses = res;
      })
      .catch(() => (this.gtClasses = []));
  }
}
