import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtClassMemberComponent } from './gt-class-member.component';

describe('GtClassMemberComponent', () => {
  let component: GtClassMemberComponent;
  let fixture: ComponentFixture<GtClassMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtClassMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtClassMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
