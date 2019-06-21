import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMembersComponent } from './event-members.component';

describe('EventMembersComponent', () => {
  let component: EventMembersComponent;
  let fixture: ComponentFixture<EventMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
