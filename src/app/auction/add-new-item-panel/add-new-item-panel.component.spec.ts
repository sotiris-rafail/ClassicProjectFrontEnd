import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewItemPanelComponent } from './add-new-item-panel.component';

describe('AddNewItemPanelComponent', () => {
  let component: AddNewItemPanelComponent;
  let fixture: ComponentFixture<AddNewItemPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewItemPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
