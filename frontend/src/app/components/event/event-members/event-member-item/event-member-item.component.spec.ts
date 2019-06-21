import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMemberItemComponent } from './event-member-item.component';

describe('EventMemberItemComponent', () => {
  let component: EventMemberItemComponent;
  let fixture: ComponentFixture<EventMemberItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMemberItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMemberItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
