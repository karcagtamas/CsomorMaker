import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtRoleModalComponent } from './gt-role-modal.component';

describe('GtRoleModalComponent', () => {
  let component: GtRoleModalComponent;
  let fixture: ComponentFixture<GtRoleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtRoleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
