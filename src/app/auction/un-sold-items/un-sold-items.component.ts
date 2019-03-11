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
    'price' : '10 millions',
    'itemId' : 45,
    'grade' : "B"
  },
  {
    'name' : 'Demon Dagger' ,
    'typeOfItem' : 'Weapon' ,
    'stateOfitem' : 'UNSOLD',
    'price' : '10 millions',
    'itemId' : 46,
    'grade' : "B"
  },
  {
    'name' : 'Demon Dagger' ,
    'typeOfItem' : 'Weapon' ,
    'stateOfitem' : 'UNSOLD',
    'price' : '10 millions',
    'itemId' : 47,
    'grade' : "B"
  }];
  columnsToDisplay = ['itemId', 'name', 'grade', 'typeOfItem', 'stateOfitem', 'price'];
 displayingView = [];

  constructor() {
    this.displayingView['itemId'] = "ID";
    this.displayingView['name'] = "Name";
    this.displayingView['grade'] = "Grade";
    this.displayingView['typeOfItem'] = "Type Of Item";
    this.displayingView['stateOfitem'] = "State Of Item";
    this.displayingView['price'] = "Price";
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  simpleBid(item : UnSoldItems){
  }

  maxBid(item : UnSoldItems){
    let index = this.dataSource.data.indexOf(item);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
}
