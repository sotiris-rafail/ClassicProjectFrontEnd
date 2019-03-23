import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveClanMemberComponent } from './remove-clan-member.component';

describe('RemoveClanMemberComponent', () => {
  let component: RemoveClanMemberComponent;
  let fixture: ComponentFixture<RemoveClanMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveClanMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveClanMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
