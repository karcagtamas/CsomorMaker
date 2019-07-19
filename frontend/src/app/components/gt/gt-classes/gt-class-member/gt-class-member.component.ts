import { Component, OnInit, Input } from '@angular/core';
import { GtClassMember } from 'src/app/models';

@Component({
  selector: 'app-gt-class-member',
  templateUrl: './gt-class-member.component.html',
  styleUrls: ['./gt-class-member.component.scss']
})
export class GtClassMemberComponent implements OnInit {
  @Input() gtClassMember: GtClassMember;

  constructor() {}

  ngOnInit() {}
}
