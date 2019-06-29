import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtClassDialogComponent } from './gt-class-dialog.component';

describe('GtClassDialogComponent', () => {
  let component: GtClassDialogComponent;
  let fixture: ComponentFixture<GtClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
