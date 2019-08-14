import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingsComponent } from './gt-presentings.component';

describe('GtPresentingsComponent', () => {
  let component: GtPresentingsComponent;
  let fixture: ComponentFixture<GtPresentingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
