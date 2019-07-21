import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPayoutDialogComponent } from './gt-payout-dialog.component';

describe('GtPayoutDialogComponent', () => {
  let component: GtPayoutDialogComponent;
  let fixture: ComponentFixture<GtPayoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPayoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPayoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
