import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtSettingsComponent } from './gt-settings.component';

describe('GtSettingsComponent', () => {
  let component: GtSettingsComponent;
  let fixture: ComponentFixture<GtSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
