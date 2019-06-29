import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtMemberModifyDialogComponent } from './gt-member-modify-dialog.component';

describe('GtMemberModifyDialogComponent', () => {
  let component: GtMemberModifyDialogComponent;
  let fixture: ComponentFixture<GtMemberModifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtMemberModifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtMemberModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
