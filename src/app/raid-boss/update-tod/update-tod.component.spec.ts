import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTODComponent } from './update-tod.component';

describe('UpdateTODComponent', () => {
  let component: UpdateTODComponent;
  let fixture: ComponentFixture<UpdateTODComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTODComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
