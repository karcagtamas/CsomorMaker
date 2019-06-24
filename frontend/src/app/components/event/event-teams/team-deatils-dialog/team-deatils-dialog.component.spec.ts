import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDeatilsDialogComponent } from './team-deatils-dialog.component';

describe('TeamDeatilsDialogComponent', () => {
  let component: TeamDeatilsDialogComponent;
  let fixture: ComponentFixture<TeamDeatilsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDeatilsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeatilsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
