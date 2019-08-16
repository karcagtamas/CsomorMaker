import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingEditorsComponent } from './gt-presenting-editors.component';

describe('GtPresentingEditorsComponent', () => {
  let component: GtPresentingEditorsComponent;
  let fixture: ComponentFixture<GtPresentingEditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingEditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingEditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
