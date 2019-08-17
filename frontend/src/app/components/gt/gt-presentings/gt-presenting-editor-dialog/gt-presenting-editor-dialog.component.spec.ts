import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingEditorDialogComponent } from './gt-presenting-editor-dialog.component';

describe('GtPresentingEditorDialogComponent', () => {
  let component: GtPresentingEditorDialogComponent;
  let fixture: ComponentFixture<GtPresentingEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
