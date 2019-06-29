import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkerSettingsComponent } from './gt-worker-settings.component';

describe('GtWorkerSettingsComponent', () => {
  let component: GtWorkerSettingsComponent;
  let fixture: ComponentFixture<GtWorkerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
