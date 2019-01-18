import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRaidBossComponent } from './register-raid-boss.component';

describe('RegisterRaidBossComponent', () => {
  let component: RegisterRaidBossComponent;
  let fixture: ComponentFixture<RegisterRaidBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRaidBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRaidBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
