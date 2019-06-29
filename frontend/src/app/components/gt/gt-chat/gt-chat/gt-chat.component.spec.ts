import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtChatComponent } from './gt-chat.component';

describe('GtChatComponent', () => {
  let component: GtChatComponent;
  let fixture: ComponentFixture<GtChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
