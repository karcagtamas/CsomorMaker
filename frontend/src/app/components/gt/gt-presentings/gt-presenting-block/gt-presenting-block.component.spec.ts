import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GtPresentingBlockComponent } from './gt-presenting-block.component';

describe('GtPresentingBlockComponent', () => {
  let component: GtPresentingBlockComponent;
  let fixture: ComponentFixture<GtPresentingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GtPresentingBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GtPresentingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
