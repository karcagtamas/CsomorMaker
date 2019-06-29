import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtTodoComponent } from './gt-todo.component';

describe('GtTodoComponent', () => {
  let component: GtTodoComponent;
  let fixture: ComponentFixture<GtTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
