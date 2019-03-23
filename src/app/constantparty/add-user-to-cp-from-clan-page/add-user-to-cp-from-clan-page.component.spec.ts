import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToCpFromClanPageComponent } from './add-user-to-cp-from-clan-page.component';

describe('AddUserToCpFromClanPageComponent', () => {
  let component: AddUserToCpFromClanPageComponent;
  let fixture: ComponentFixture<AddUserToCpFromClanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToCpFromClanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToCpFromClanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
