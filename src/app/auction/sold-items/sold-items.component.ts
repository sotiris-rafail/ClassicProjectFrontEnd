import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { SoldItems } from '../auction.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'] ,
  
})
export class SoldItemsComponent implements OnInit {
  @Input() panelState: Subject<any>;
  dataSource : SoldItems[] = [];
  displayedColumns = ['itemId', 'name', 'typeOfItem', 'grade', 'stateOfitem', 'price', 'whoBoughtIt', 'boughtPrice'];
  //expandedElement: PeriodicElement | null;
  constructor() { }

  ngOnInit() {
    this.openSoldPanel();
  }

  openSoldPanel(){
    if(this.panelState){
      this.dataSource = [{
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions'
      },
      {
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions'
      },
      {
        'name' : 'Demon Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfitem' : 'SOLD',
        'price' : '10 millions',
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : '10 millions'
      }]
    } else {
      this.dataSource = [];
    }
  }

}
