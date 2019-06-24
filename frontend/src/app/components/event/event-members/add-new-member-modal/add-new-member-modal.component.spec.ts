import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMemberModalComponent } from './add-new-member-modal.component';

describe('AddNewMemberModalComponent', () => {
  let component: AddNewMemberModalComponent;
  let fixture: ComponentFixture<AddNewMemberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMemberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
