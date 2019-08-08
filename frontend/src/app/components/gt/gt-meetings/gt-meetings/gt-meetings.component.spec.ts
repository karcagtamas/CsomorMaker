import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtMeetingsComponent } from './gt-meetings.component';

describe('GtMeetingsComponent', () => {
  let component: GtMeetingsComponent;
  let fixture: ComponentFixture<GtMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
