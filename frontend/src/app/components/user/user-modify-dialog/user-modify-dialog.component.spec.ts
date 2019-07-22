import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModifyDialogComponent } from './user-modify-dialog.component';

describe('UserModifyDialogComponent', () => {
  let component: UserModifyDialogComponent;
  let fixture: ComponentFixture<UserModifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
