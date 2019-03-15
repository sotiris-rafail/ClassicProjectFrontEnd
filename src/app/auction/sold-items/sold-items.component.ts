import { Component, OnInit, Input } from '@angular/core';
import { SoldItem } from '../auction.component';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ItemService } from '../item-service.service';

@Component({
  selector: 'sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'] ,
  providers : [ItemService]
})
export class SoldItemsComponent implements OnInit {
  @Input() panelState: Subject<any>;
  dataSource : MatTableDataSource<SoldItem>;
  displayedColumns = ['itemId', 'photoPath', 'name', 'typeOfItem', 'grade', 'stateOfItem', 'price', 'whoBoughtIt', 'boughtPrice' , 'delivered', 'more'];
  //expandedElement: PeriodicElement | null;
  constructor(private itemService : ItemService) { }

  ngOnInit() {
    this.openSoldPanel();
  }

  openSoldPanel(){
    if(this.panelState){
      let data = [{
        'name' : 'Demon\'s Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfItem' : 'SOLD',
        'price' : 10000000,
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : 10000000,
        'delivered' : false,
        'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
      },
      {
        'name' : 'Demon\'s Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfItem' : 'SOLD',
        'price' : 10000000,
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : 10000000,
        'delivered' : false,
        'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
      },
      {
        'name' : 'Demon\'s Dagger' ,
        'typeOfItem' : 'Weapon' ,
        'stateOfItem' : 'SOLD',
        'price' : 10000000,
        'itemId' : 45,
        'grade' : "B",
        'whoBoughtIt' : 'DrENigma',
        'boughtPrice' : 10000000,
        'delivered' : false,
        'photoPath' : "../../../assets/itemPhoto/demon\'s_dagger.jpg"
      }]
      this.dataSource = new MatTableDataSource<SoldItem>(data);
    } else {
      this.dataSource = new MatTableDataSource<SoldItem>([]);
    }
  }

  deliveryIt(item : SoldItem) {
    let index = this.dataSource.data.indexOf(item, 0);
    this.itemService.deliverSoldItem(this.dataSource.data[index].itemId, true, sessionStorage.getItem("access_token")).subscribe(
      respnse => {
        this.dataSource.data[index].delivered = true; 
        this.dataSource._updateChangeSubscription();
      },
      error => {console.log(error),
        this.dataSource.data[index].delivered = false; 
        this.dataSource._updateChangeSubscription();}
    );
  }

}
