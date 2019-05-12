import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImageShowComponent } from './full-image-show.component';

describe('FullImageShowComponent', () => {
  let component: FullImageShowComponent;
  let fixture: ComponentFixture<FullImageShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullImageShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullImageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
