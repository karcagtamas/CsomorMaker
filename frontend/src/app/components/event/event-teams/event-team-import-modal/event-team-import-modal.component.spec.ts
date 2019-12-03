import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTeamImportModalComponent } from './event-team-import-modal.component';

describe('EventTeamImportModalComponent', () => {
  let component: EventTeamImportModalComponent;
  let fixture: ComponentFixture<EventTeamImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTeamImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTeamImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
