import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventToDoComponent } from './event-to-do.component';

describe('EventToDoComponent', () => {
  let component: EventToDoComponent;
  let fixture: ComponentFixture<EventToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
