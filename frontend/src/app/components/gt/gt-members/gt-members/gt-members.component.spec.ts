import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtMembersComponent } from './gt-members.component';

describe('GtMembersComponent', () => {
  let component: GtMembersComponent;
  let fixture: ComponentFixture<GtMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
