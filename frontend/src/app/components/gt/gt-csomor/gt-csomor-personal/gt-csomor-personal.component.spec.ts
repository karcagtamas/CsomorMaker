import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtCsomorPersonalComponent } from './gt-csomor-personal.component';

describe('GtCsomorPersonalComponent', () => {
  let component: GtCsomorPersonalComponent;
  let fixture: ComponentFixture<GtCsomorPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtCsomorPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtCsomorPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
