import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtCsomorComponent } from './gt-csomor.component';

describe('GtCsomorComponent', () => {
  let component: GtCsomorComponent;
  let fixture: ComponentFixture<GtCsomorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtCsomorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtCsomorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
