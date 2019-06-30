import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventWorkCsomorComponent } from './event-work-csomor.component';

describe('EventWorkCsomorComponent', () => {
  let component: EventWorkCsomorComponent;
  let fixture: ComponentFixture<EventWorkCsomorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWorkCsomorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventWorkCsomorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
