import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionCharacterPanelComponent } from './addition-character-panel.component';

describe('AdditionCharacterPanelComponent', () => {
  let component: AdditionCharacterPanelComponent;
  let fixture: ComponentFixture<AdditionCharacterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionCharacterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionCharacterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
