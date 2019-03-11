import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSoldItemsComponent } from './un-sold-items.component';

describe('UnSoldItemsComponent', () => {
  let component: UnSoldItemsComponent;
  let fixture: ComponentFixture<UnSoldItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnSoldItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnSoldItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
