import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtClassComponent } from './gt-class.component';

describe('GtClassComponent', () => {
  let component: GtClassComponent;
  let fixture: ComponentFixture<GtClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
