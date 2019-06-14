import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePayOutConfirmDialogComponent } from './delete-pay-out-confirm-dialog.component';

describe('DeletePayOutConfirmDialogComponent', () => {
  let component: DeletePayOutConfirmDialogComponent;
  let fixture: ComponentFixture<DeletePayOutConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePayOutConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePayOutConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
