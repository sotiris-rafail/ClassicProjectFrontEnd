import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSaleSoldItemComponent } from './re-sale-sold-item.component';

describe('ReSaleSoldItemComponent', () => {
  let component: ReSaleSoldItemComponent;
  let fixture: ComponentFixture<ReSaleSoldItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReSaleSoldItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReSaleSoldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
