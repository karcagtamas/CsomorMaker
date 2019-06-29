import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtTodoesComponent } from './gt-todoes.component';

describe('GtTodoesComponent', () => {
  let component: GtTodoesComponent;
  let fixture: ComponentFixture<GtTodoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtTodoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtTodoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
