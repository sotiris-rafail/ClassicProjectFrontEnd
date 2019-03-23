import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewConstantPartyComponent } from './add-new-constant-party.component';

describe('AddNewConstantPartyComponent', () => {
  let component: AddNewConstantPartyComponent;
  let fixture: ComponentFixture<AddNewConstantPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewConstantPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewConstantPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
