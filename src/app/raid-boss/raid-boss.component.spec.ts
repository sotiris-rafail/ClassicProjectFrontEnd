import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidBossComponent } from './raid-boss.component';

describe('RaidBossComponent', () => {
  let component: RaidBossComponent;
  let fixture: ComponentFixture<RaidBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
