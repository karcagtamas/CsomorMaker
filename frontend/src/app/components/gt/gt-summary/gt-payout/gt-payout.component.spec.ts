import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPayoutComponent } from './gt-payout.component';

describe('GtPayoutComponent', () => {
  let component: GtPayoutComponent;
  let fixture: ComponentFixture<GtPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
