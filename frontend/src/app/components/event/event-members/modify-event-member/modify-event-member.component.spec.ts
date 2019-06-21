import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEventMemberComponent } from './modify-event-member.component';

describe('ModifyEventMemberComponent', () => {
  let component: ModifyEventMemberComponent;
  let fixture: ComponentFixture<ModifyEventMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyEventMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEventMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
