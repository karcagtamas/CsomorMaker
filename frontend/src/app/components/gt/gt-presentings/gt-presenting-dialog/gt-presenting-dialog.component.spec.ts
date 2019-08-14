import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingDialogComponent } from './gt-presenting-dialog.component';

describe('GtPresentingDialogComponent', () => {
  let component: GtPresentingDialogComponent;
  let fixture: ComponentFixture<GtPresentingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
