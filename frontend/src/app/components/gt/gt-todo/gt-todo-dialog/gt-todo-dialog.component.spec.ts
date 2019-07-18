import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtTodoDialogComponent } from './gt-todo-dialog.component';

describe('GtTodoDialogComponent', () => {
  let component: GtTodoDialogComponent;
  let fixture: ComponentFixture<GtTodoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtTodoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
