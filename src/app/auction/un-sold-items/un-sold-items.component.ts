import { AuctionBidConfirmationPanelComponent } from './../auction-bid-confirmation-panel/auction-bid-confirmation-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { ItemService } from '../item-service.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';
import { UnSoldItem } from '../auction.component';

@Component({
  selector: 'app-un-sold-items',
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
  private _panelState: Boolean = true;
  @Input()
  set panelState(value: Boolean) {
    this._panelState = value;
  }
  isFirstTime: Boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<UnSoldItemDisplay>;
  data: UnSoldItemDisplay[] = [];
  columnsToDisplay = ['itemId', 'name', 'photoPath', 'grade', 'typeOfItem', 'stateOfItem', 'startingPrice', 'maxPrice', 'expirationDate'];
  displayingView = [];

  constructor(private dialog: MatDialog, private itemService: ItemService, private snackBar: MatSnackBar, private router: Router) {
    this.displayingView['itemId'] = 'ID';
    this.displayingView['name'] = 'Name';
    this.displayingView['grade'] = 'Grade';
    this.displayingView['typeOfItem'] = 'Type Of Item';
    this.displayingView['stateOfItem'] = 'State Of Item';
    this.displayingView['maxPrice'] = 'Max Price';
    this.displayingView['startingPrice'] = 'Starting Price';
    this.displayingView['expirationDate'] = 'Expiration Date';
    this.displayingView['photoPath'] = 'Photo';
  }

  ngOnInit() {
    this.openUnSoldPanel();
    this.isFirstTime = false;
  }

  ngOnChanges() {
    if (this._panelState && !this.isFirstTime) {
      this.openUnSoldPanel();
    } else {
      this.dataSource = new MatTableDataSource<UnSoldItemDisplay>([]);
    }
  }

  openUnSoldPanel() {
    this.itemService.getUnSoldItems(sessionStorage.getItem('access_token')).subscribe(
      response => {
        response.forEach(unsoldItem => {
          unsoldItem.expirationDate = new Date(String(unsoldItem.expirationDate)).toISOString();
        });
        this.dataSource = new MatTableDataSource<UnSoldItemDisplay>(response);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            data: { message: error.error.message || error.error.error_description, type : 'alert' },
            duration: 5000,
            panelClass: ['snackBarAlert'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          if(Number(error.status) == 401 ){
            this.router.navigateByUrl('/');
          }
      }
    );
  }

  simpleBid(item: UnSoldItem) {
    const dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'simple' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.itemService.bidForItem(item.itemId, item.bidStep, sessionStorage.getItem('userId'), sessionStorage.getItem('access_token')).subscribe(
          response => {
            const lastBidder: string = String(response);
            const index = this.dataSource.data.indexOf(item);
            const currentValue: number = this.dataSource.data[index].currentValue + this.dataSource.data[index].bidStep;
            this.dataSource.data[index].currentValue = currentValue;
            this.dataSource.data[index].lastBidder = lastBidder;
            if (this.dataSource.data[index].currentValue >= this.dataSource.data[index].maxPrice) {
              this.dataSource.data.splice(index, 1);
            }
            this.dataSource._updateChangeSubscription();

          },
          error => {
            this.snackBar.open(JSON.parse(error.error).message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
          }
        );
      }
    });
  }

  maxBid(item: UnSoldItem) {
    const dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'buyNow' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.itemService.buyNow(item.itemId, sessionStorage.getItem('userId'), sessionStorage.getItem('access_token')).subscribe(
          response => {
            const index = this.dataSource.data.indexOf(item);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.snackBar.open(error.error.message, 'OK', { duration: 500, panelClass: 'alternate-theme' });
          });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


export interface UnSoldItemDisplay {
  'itemId': number;
  'grade': String;
  'typeOfItem': String;
  'maxPrice': number;
  'startingPrice': number;
  'stateOfItem': String;
  'name': String;
  'numberOfDays': number;
  'bidStep': number;
  'currentValue': number;
  'lastBidder': String;
  'photoPath': String;
  'expirationDate'?: String;
}
