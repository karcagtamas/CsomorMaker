import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkDetailsComponent } from './gt-work-details.component';

describe('GtWorkDetailsComponent', () => {
  let component: GtWorkDetailsComponent;
  let fixture: ComponentFixture<GtWorkDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
