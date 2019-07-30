import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtImportMembersDialogComponent } from './gt-import-members-dialog.component';

describe('GtImportMembersDialogComponent', () => {
  let component: GtImportMembersDialogComponent;
  let fixture: ComponentFixture<GtImportMembersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtImportMembersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtImportMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
