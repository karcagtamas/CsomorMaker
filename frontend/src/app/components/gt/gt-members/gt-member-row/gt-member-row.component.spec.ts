import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtMemberRowComponent } from './gt-member-row.component';

describe('GtMemberRowComponent', () => {
  let component: GtMemberRowComponent;
  let fixture: ComponentFixture<GtMemberRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtMemberRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtMemberRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
