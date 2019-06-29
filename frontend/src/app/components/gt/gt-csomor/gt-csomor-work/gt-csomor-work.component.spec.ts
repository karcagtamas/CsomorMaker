import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtCsomorWorkComponent } from './gt-csomor-work.component';

describe('GtCsomorWorkComponent', () => {
  let component: GtCsomorWorkComponent;
  let fixture: ComponentFixture<GtCsomorWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtCsomorWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtCsomorWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
