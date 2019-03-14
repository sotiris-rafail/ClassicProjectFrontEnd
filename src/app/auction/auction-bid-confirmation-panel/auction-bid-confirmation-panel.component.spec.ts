import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBidConfirmationPanelComponent } from './auction-bid-confirmation-panel.component';

describe('AuctionBidConfirmationPanelComponent', () => {
  let component: AuctionBidConfirmationPanelComponent;
  let fixture: ComponentFixture<AuctionBidConfirmationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionBidConfirmationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionBidConfirmationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
