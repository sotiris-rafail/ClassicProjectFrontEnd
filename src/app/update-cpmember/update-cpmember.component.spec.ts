import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCPMemberComponent } from './update-cpmember.component';

describe('UpdateCPMemberComponent', () => {
  let component: UpdateCPMemberComponent;
  let fixture: ComponentFixture<UpdateCPMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCPMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCPMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
