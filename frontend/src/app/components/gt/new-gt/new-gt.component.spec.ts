import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGtComponent } from './new-gt.component';

describe('NewGtComponent', () => {
  let component: NewGtComponent;
  let fixture: ComponentFixture<NewGtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
