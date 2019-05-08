import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpPhotosShowComponent } from './cp-photos-show.component';

describe('CpPhotosShowComponent', () => {
  let component: CpPhotosShowComponent;
  let fixture: ComponentFixture<CpPhotosShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpPhotosShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpPhotosShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
