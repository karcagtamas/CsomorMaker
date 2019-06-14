import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPayOutDialogComponent } from './new-pay-out-dialog.component';

describe('NewPayOutDialogComponent', () => {
  let component: NewPayOutDialogComponent;
  let fixture: ComponentFixture<NewPayOutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayOutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
