import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPersonalCsomorComponent } from './event-personal-csomor.component';

describe('EventPersonalCsomorComponent', () => {
  let component: EventPersonalCsomorComponent;
  let fixture: ComponentFixture<EventPersonalCsomorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPersonalCsomorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPersonalCsomorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
