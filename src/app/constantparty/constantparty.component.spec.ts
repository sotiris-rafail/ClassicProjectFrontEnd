import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantpartyComponent } from './constantparty.component';

describe('ConstantpartyComponent', () => {
  let component: ConstantpartyComponent;
  let fixture: ComponentFixture<ConstantpartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstantpartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
