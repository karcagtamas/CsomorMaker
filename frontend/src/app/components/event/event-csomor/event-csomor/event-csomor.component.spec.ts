import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCsomorComponent } from './event-csomor.component';

describe('EventCsomorComponent', () => {
  let component: EventCsomorComponent;
  let fixture: ComponentFixture<EventCsomorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCsomorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCsomorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
