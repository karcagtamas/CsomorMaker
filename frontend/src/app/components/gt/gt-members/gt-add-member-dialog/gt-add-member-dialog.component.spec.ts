import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtAddMemberDialogComponent } from './gt-add-member-dialog.component';

describe('GtAddMemberDialogComponent', () => {
  let component: GtAddMemberDialogComponent;
  let fixture: ComponentFixture<GtAddMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtAddMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtAddMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
