import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtDetailsComponent } from './gt-details.component';

describe('GtDetailsComponent', () => {
  let component: GtDetailsComponent;
  let fixture: ComponentFixture<GtDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
