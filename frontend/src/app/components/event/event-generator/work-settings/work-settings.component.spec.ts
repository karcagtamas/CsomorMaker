import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSettingsComponent } from './work-settings.component';

describe('WorkSettingsComponent', () => {
  let component: WorkSettingsComponent;
  let fixture: ComponentFixture<WorkSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
