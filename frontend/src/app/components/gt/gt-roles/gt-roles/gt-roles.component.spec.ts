import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtRolesComponent } from './gt-roles.component';

describe('GtRolesComponent', () => {
  let component: GtRolesComponent;
  let fixture: ComponentFixture<GtRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
