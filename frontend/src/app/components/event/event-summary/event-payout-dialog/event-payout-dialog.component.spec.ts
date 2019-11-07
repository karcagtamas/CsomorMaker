import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPayoutDialogComponent } from './event-payout-dialog.component';

describe('EventPayoutDialogComponent', () => {
  let component: EventPayoutDialogComponent;
  let fixture: ComponentFixture<EventPayoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPayoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
