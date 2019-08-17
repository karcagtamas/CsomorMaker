import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingEditorComponent } from './gt-presenting-editor.component';

describe('GtPresentingEditorComponent', () => {
  let component: GtPresentingEditorComponent;
  let fixture: ComponentFixture<GtPresentingEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
