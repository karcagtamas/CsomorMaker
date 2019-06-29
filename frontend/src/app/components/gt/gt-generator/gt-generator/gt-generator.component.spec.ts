import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtGeneratorComponent } from './gt-generator.component';

describe('GtGeneratorComponent', () => {
  let component: GtGeneratorComponent;
  let fixture: ComponentFixture<GtGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
