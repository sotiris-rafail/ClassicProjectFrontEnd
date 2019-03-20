import { AuctionBidConfirmationPanelComponent } from './../auction-bid-confirmation-panel/auction-bid-confirmation-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SoldItem, UnSoldItem } from '../auction.component';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { ItemService } from '../item-service.service';

@Component({
  selector: 'un-sold-items',
  templateUrl: './un-sold-items.component.html',
  styleUrls: ['./un-sold-items.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], providers: [ItemService],
})
export class UnSoldItemsComponent implements OnInit, OnChanges {
  private _panelState: boolean = true;
  @Input()
  set panelState(value: boolean) {
    this._panelState = value;
  }
  isFirstTime : boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<UnSoldItem>;
  data: UnSoldItem[] = [];
  columnsToDisplay = ['itemId', 'name', 'photoPath', 'grade', 'typeOfItem', 'stateOfItem', 'startingPrice', 'maxPrice', 'expirationDate'];
  displayingView = [];

  constructor(private dialog: MatDialog, private itemService: ItemService, private snackBar: MatSnackBar) {
    this.displayingView['itemId'] = "ID";
    this.displayingView['name'] = "Name";
    this.displayingView['grade'] = "Grade";
    this.displayingView['typeOfItem'] = "Type Of Item";
    this.displayingView['stateOfItem'] = "State Of Item";
    this.displayingView['maxPrice'] = "Max Price";
    this.displayingView['startingPrice'] = "Starting Price";
    this.displayingView['expirationDate'] = "Expiration Date";
    this.displayingView['photoPath'] = "Photo";
  }

  ngOnInit() {
    this.openUnSoldPanel();
    this.isFirstTime = false;
  }

  ngOnChanges() {
    if (this._panelState && !this.isFirstTime) {
      console.log("trexw kai egw")
      this.openUnSoldPanel();
    } else {
      this.dataSource = new MatTableDataSource<UnSoldItem>([]);
    }
  }

  openUnSoldPanel(){
    this.itemService.getUnSoldItems(sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.dataSource = new MatTableDataSource<UnSoldItem>(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.snackBar.open(error.error.message, "OK", { duration: 5000 })
      }
    )
  }

  simpleBid(item: UnSoldItem) {
    let dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'simple' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.itemService.bidForItem(item.itemId, item.bidStep, sessionStorage.getItem("userId"), sessionStorage.getItem("access_token")).subscribe(
          response => {
            let lastBidder: string = String(response);
            let index = this.dataSource.data.indexOf(item);
            let currentValue: number = this.dataSource.data[index].currentValue + this.dataSource.data[index].bidStep;
            this.dataSource.data[index].currentValue = currentValue;
            this.dataSource.data[index].lastBidder = lastBidder;
            if (this.dataSource.data[index].currentValue >= this.dataSource.data[index].maxPrice) {
              this.dataSource.data.splice(index, 1);
            }
            this.dataSource._updateChangeSubscription();

          },
          error => {
            this.snackBar.open(JSON.parse(error.error).message, "OK", { duration: 5000 });
          }
        )
      }
    });
  }

  maxBid(item: UnSoldItem) {
    let dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'buyNow' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.itemService.buyNow(item.itemId, sessionStorage.getItem("userId"), sessionStorage.getItem("access_token")).subscribe(
          response => {
            let index = this.dataSource.data.indexOf(item);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.snackBar.open(error.error.message, "OK", { duration: 5000 });
          });
      }
    });
  }
}
