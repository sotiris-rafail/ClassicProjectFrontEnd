import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { flushModuleScopingQueueAsMuchAsPossible } from '@angular/core/src/render3/jit/module';

@Component({
  selector: 'app-auction-bid-confirmation-panel',
  templateUrl: './auction-bid-confirmation-panel.component.html',
  styleUrls: ['./auction-bid-confirmation-panel.component.css']
})
export class AuctionBidConfirmationPanelComponent implements OnInit {

   yesOrNo : boolean = false;
  constructor(private dialog : MatDialogRef<AuctionBidConfirmationPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }
  
  BidForIt(){
    this.yesOrNo = true;
    this.dialog.close(this.yesOrNo);
  }

  handleCancel(){
    this.yesOrNo = false;
    this.dialog.close(this.yesOrNo);
  }


}
