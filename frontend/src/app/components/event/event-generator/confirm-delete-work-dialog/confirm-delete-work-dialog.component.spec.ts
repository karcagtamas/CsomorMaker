import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteWorkDialogComponent } from './confirm-delete-work-dialog.component';

describe('ConfirmDeleteWorkDialogComponent', () => {
  let component: ConfirmDeleteWorkDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteWorkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteWorkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteWorkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
