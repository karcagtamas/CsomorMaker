import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GtClass, GtClassMember } from 'src/app/models';
import { GtClassesService } from 'src/app/services';

@Component({
  selector: 'app-gt-class',
  templateUrl: './gt-class.component.html',
  styleUrls: ['./gt-class.component.scss']
})
export class GtClassComponent implements OnInit, OnChanges {
  @Input() gtClass: GtClass;
  gtClassMembers: GtClassMember[] = [];

  constructor(private gtclassesservice: GtClassesService) {}

  ngOnInit() {
    this.getGtClassMembers();
  }

  ngOnChanges() {
    this.getGtClassMembers();
  }

  getGtClassMembers() {
    this.gtclassesservice
      .getGtClassMembers(this.gtClass.id)
      .then(res => {
        this.gtClassMembers = res;
      })
      .catch(() => {
        this.gtClassMembers = [];
      });
  }
}
