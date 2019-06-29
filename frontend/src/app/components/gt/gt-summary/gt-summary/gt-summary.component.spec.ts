import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtSummaryComponent } from './gt-summary.component';

describe('GtSummaryComponent', () => {
  let component: GtSummaryComponent;
  let fixture: ComponentFixture<GtSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
