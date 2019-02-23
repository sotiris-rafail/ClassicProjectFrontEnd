import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemberRoleComponent } from './change-member-role.component';

describe('ChangeMemberRoleComponent', () => {
  let component: ChangeMemberRoleComponent;
  let fixture: ComponentFixture<ChangeMemberRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMemberRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMemberRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
