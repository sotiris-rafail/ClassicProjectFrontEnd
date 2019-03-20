import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayingErrorComponent } from './displaying-error.component';

describe('DisplayingErrorComponent', () => {
  let component: DisplayingErrorComponent;
  let fixture: ComponentFixture<DisplayingErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayingErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayingErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
