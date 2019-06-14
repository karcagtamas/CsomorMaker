import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePayOutDialogComponent } from './delete-pay-out-dialog.component';

describe('DeletePayOutDialogComponent', () => {
  let component: DeletePayOutDialogComponent;
  let fixture: ComponentFixture<DeletePayOutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePayOutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePayOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
