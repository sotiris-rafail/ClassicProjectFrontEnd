import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SoldItems, UnSoldItems } from '../auction.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'un-sold-items',
  templateUrl: './un-sold-items.component.html',
  styleUrls: ['./un-sold-items.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UnSoldItemsComponent implements OnInit {
  
  dataSource : MatTableDataSource<UnSoldItems>;
  data = [{
    'name' : 'Demon Dagger' ,
    'typeOfItem' : 'Weapon' ,
    'stateOfitem' : 'UNSOLD',
    'maxPrice' : 100,
    'itemId' : 45,
    'grade' : "B",
    'startingPrice' : 20,
    'numberOfDays' : new Date().toISOString(),
    'bidStep' : 5,
    'currentValue' : 30,
    'lastBidder' : 'DrEnigma'
   },
  {
    'name' : 'Demon Dagger' ,
    'typeOfItem' : 'Weapon' ,
    'stateOfitem' : 'UNSOLD',
    'maxPrice' : 100,
    'itemId' : 46,
    'grade' : "B",
    'startingPrice' : 20,
    'numberOfDays' : new Date().toISOString(),
    'bidStep' : 5,
    'currentValue' : 30,
    'lastBidder' : 'DrEnigma'
  },
  {
    'name' : 'Demon Dagger' ,
    'typeOfItem' : 'Weapon' ,
    'stateOfitem' : 'UNSOLD',
    'maxPrice' : 100,
    'itemId' : 47,
    'grade' : "B",
    'startingPrice' : 20,
    'numberOfDays' : new Date().toISOString(),
    'bidStep' : 5,
    'currentValue' : 30,
    'lastBidder' : 'DrEnigma'
  }];
  columnsToDisplay = ['itemId', 'name', 'grade', 'typeOfItem', 'stateOfitem', 'startingPrice', 'maxPrice', 'numberOfDays'];
 displayingView = [];

  constructor() {
    this.displayingView['itemId'] = "ID";
    this.displayingView['name'] = "Name";
    this.displayingView['grade'] = "Grade";
    this.displayingView['typeOfItem'] = "Type Of Item";
    this.displayingView['stateOfitem'] = "State Of Item";
    this.displayingView['maxPrice'] = "Max Price";
    this.displayingView['startingPrice'] = "Starting Price";
    this.displayingView['numberOfDays'] = "Expiration Date";
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  simpleBid(item : UnSoldItems){
    let index = this.dataSource.data.indexOf(item);
    let currentValue = this.dataSource.data[index].currentValue + this.dataSource.data[index].bidStep;
    this.dataSource.data[index].currentValue = currentValue;
    this.dataSource._updateChangeSubscription();
  }

  maxBid(item : UnSoldItems){
    let index = this.dataSource.data.indexOf(item);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}
