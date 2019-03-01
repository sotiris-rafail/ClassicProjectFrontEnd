import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContastpartyEpicPointsComponent } from './contastparty-epic-points.component';

describe('ContastpartyEpicPointsComponent', () => {
  let component: ContastpartyEpicPointsComponent;
  let fixture: ComponentFixture<ContastpartyEpicPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContastpartyEpicPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContastpartyEpicPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
