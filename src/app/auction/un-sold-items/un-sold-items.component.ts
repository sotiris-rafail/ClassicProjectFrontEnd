import { AuctionBidConfirmationPanelComponent } from './../auction-bid-confirmation-panel/auction-bid-confirmation-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SoldItem, UnSoldItem } from '../auction.component';
import { MatTableDataSource } from '@angular/material';

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
  ],
})
export class UnSoldItemsComponent implements OnInit {

  dataSource: MatTableDataSource<UnSoldItem>;
  data = [{
    'name': 'Demon\'s Dagger',
    'typeOfItem': 'Weapon',
    'stateOfItem': 'UNSOLD',
    'maxPrice': 10000000,
    'itemId': 45,
    'grade': "B",
    'startingPrice': 2000000,
    'numberOfDays': new Date().toISOString(),
    'bidStep': 500000,
    'currentValue': 3000000,
    'lastBidder': 'DrEnigma',
    'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
  },
  {
    'name': 'Demon\'s Dagger',
    'typeOfItem': 'Weapon',
    'stateOfItem': 'UNSOLD',
    'maxPrice': 10000000,
    'itemId': 46,
    'grade': "B",
    'startingPrice': 2000000,
    'numberOfDays': new Date().toISOString(),
    'bidStep': 500000,
    'currentValue': 3000000,
    'lastBidder': 'DrEnigma',
    'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
  },
  {
    'name': 'Demon\'s Dagger',
    'typeOfItem': 'Weapon',
    'stateOfItem': 'UNSOLD',
    'maxPrice': 10000000,
    'itemId': 47,
    'grade': "B",
    'startingPrice': 2000000,
    'numberOfDays': new Date().toISOString(),
    'bidStep': 500000,
    'currentValue': 3000000,
    'lastBidder': 'DrEnigma',
    'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
  }];
  columnsToDisplay = ['itemId', 'name', 'photoPath', 'grade', 'typeOfItem', 'stateOfItem', 'startingPrice', 'maxPrice', 'numberOfDays'];
  displayingView = [];

  constructor(private dialog: MatDialog) {
    this.displayingView['itemId'] = "ID";
    this.displayingView['name'] = "Name";
    this.displayingView['grade'] = "Grade";
    this.displayingView['typeOfItem'] = "Type Of Item";
    this.displayingView['stateOfItem'] = "State Of Item";
    this.displayingView['maxPrice'] = "Max Price";
    this.displayingView['startingPrice'] = "Starting Price";
    this.displayingView['numberOfDays'] = "Expiration Date";
    this.displayingView['photoPath'] = "Photo";
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  simpleBid(item: UnSoldItem) {
    let dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'simple' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let index = this.dataSource.data.indexOf(item);
        let currentValue: number = this.dataSource.data[index].currentValue + this.dataSource.data[index].bidStep;
        this.dataSource.data[index].currentValue = currentValue;
        if (this.dataSource.data[index].currentValue >= this.dataSource.data[index].maxPrice) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  maxBid(item: UnSoldItem) {
    let dialogRef = this.dialog.open(AuctionBidConfirmationPanelComponent, { data: { item: item, button: 'buyNow' }, disableClose: true });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        let index = this.dataSource.data.indexOf(item);
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }
}
