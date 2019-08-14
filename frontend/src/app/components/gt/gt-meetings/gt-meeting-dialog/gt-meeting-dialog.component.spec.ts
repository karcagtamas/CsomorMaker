import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtMeetingDialogComponent } from './gt-meeting-dialog.component';

describe('GtMeetingDialogComponent', () => {
  let component: GtMeetingDialogComponent;
  let fixture: ComponentFixture<GtMeetingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtMeetingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
