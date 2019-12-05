import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRoleModalComponent } from './event-role-modal.component';

describe('EventRoleModalComponent', () => {
  let component: EventRoleModalComponent;
  let fixture: ComponentFixture<EventRoleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRoleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
