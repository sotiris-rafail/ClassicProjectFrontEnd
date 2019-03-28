import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { EpicPointsDashboardDisplayComponent } from './epic-points-dashboard-display.component';

describe('EpicPointsDashboardDiaplyComponent', () => {
  let component: EpicPointsDashboardDisplayComponent;
  let fixture: ComponentFixture<EpicPointsDashboardDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicPointsDashboardDisplayComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicPointsDashboardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
