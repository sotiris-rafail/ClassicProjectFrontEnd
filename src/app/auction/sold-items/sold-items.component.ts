import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SoldItems } from '../auction.component';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'] ,
  
})
export class SoldItemsComponent implements OnInit {
  @Input() panelState: Subject<any>;
  dataSource : MatTableDataSource<SoldItems>;
  displayedColumns = ['itemId', 'name', 'typeOfItem', 'grade', 'stateOfitem', 'price', 'whoBoughtIt', 'boughtPrice' , 'delivered', 'more'];
  //expandedElement: PeriodicElement | null;
  constructor() { }

  ngOnInit() {
    this.openSoldPanel();
  }

  openSoldPanel(){
    if(this.panelState){
      let data = [{
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions',
        'delivered' : false
      },
      {
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions',
        'delivered' : false
      },
      {
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions',
        'delivered' : false
      }]
      this.dataSource = new MatTableDataSource<SoldItems>(data);
    } else {
      this.dataSource = new MatTableDataSource<SoldItems>([]);
    }
  }

  deliveryIt(item : SoldItems) {
    let index = this.dataSource.data.indexOf(item, 0);
    this.dataSource.data[index].delivered = true;
    this.dataSource._updateChangeSubscription();
  }

}
