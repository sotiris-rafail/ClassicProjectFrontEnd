import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionMemberPanelComponent } from './addition-member-panel.component';

describe('AdditionMemberPanelComponent', () => {
  let component: AdditionMemberPanelComponent;
  let fixture: ComponentFixture<AdditionMemberPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionMemberPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionMemberPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
