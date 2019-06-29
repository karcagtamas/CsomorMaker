import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtClassMemberDialogComponent } from './gt-class-member-dialog.component';

describe('GtClassMemberDialogComponent', () => {
  let component: GtClassMemberDialogComponent;
  let fixture: ComponentFixture<GtClassMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtClassMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtClassMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
