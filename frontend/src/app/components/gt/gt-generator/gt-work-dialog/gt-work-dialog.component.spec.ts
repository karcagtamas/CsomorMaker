import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtWorkDialogComponent } from './gt-work-dialog.component';

describe('GtWorkDialogComponent', () => {
  let component: GtWorkDialogComponent;
  let fixture: ComponentFixture<GtWorkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtWorkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtWorkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
