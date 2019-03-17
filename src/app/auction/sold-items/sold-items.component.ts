import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { SoldItem } from '../auction.component';
import { Subject } from 'rxjs';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { ItemService } from '../item-service.service';


const data = [{
  'name': 'Demon\'s Dagger',
  'typeOfItem': 'Weapon',
  'stateOfItem': 'SOLD',
  'price': 10000000,
  'itemId': 45,
  'grade': "B",
  'whoBoughtIt': 'DrENigma',
  'boughtPrice': 10000000,
  'delivered': false,
  'photoPath': "../../../assets/itemPhoto/demon\'s_dagger.jpg"},
{
  'name': 'Demon\'s Dagger',
  'typeOfItem': 'Weapon',
  'stateOfItem': 'SOLD',
  'price': 10000000,
  'itemId': 45,
  'grade': "B",
  'whoBoughtIt': 'DrENigma',
  'boughtPrice': 10000000,
  'delivered': false,
  'photoPath': "../../../assets/itemPhoto/demon\'s_dagger.jpg"
},
{
  'name': 'Demon\'s Dagger',
  'typeOfItem': 'Weapon',
  'stateOfItem': 'SOLD',
  'price': 10000000,
  'itemId': 45,
  'grade': "B",
  'whoBoughtIt': 'DrENigma',
  'boughtPrice': 10000000,
  'delivered': false,
  'photoPath': "../../../assets/itemPhoto/demon\'s_dagger.jpg"
}]
@Component({
  selector: 'sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'],
  providers: [ItemService]
})
export class SoldItemsComponent implements OnInit, OnChanges {
  private _panelState : boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() 
  set panelState(value : boolean){
    this._panelState = value;
  }
  dataSource: MatTableDataSource<SoldItem>;
  displayedColumns = ['itemId', 'photoPath', 'name', 'typeOfItem', 'grade', 'stateOfItem', 'price', 'whoBoughtIt', 'boughtPrice', 'delivered', 'more'];
  constructor(private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.openSoldPanel();
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(){
    this.openSoldPanel();
  }

  openSoldPanel() {
    if (this._panelState) {
      this.itemService.getSoldItems(sessionStorage.getItem("access_token")).subscribe(
        response => {
          this.dataSource = new MatTableDataSource<SoldItem>(response);
          console.log(response)
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.snackBar.open(error.error.message, "OK", { duration : 5000})
        }
      )
    } else {
      this.dataSource = new MatTableDataSource<SoldItem>([]);
    }
  }

  deliveryIt(item: SoldItem) {
    let index = this.dataSource.data.indexOf(item, 0);
    this.itemService.deliverSoldItem(this.dataSource.data[index].itemId, true, sessionStorage.getItem("access_token")).subscribe(
      respnse => {
        this.dataSource.data[index].delivered = true;
        this.dataSource._updateChangeSubscription();
      },
      error => {
        this.dataSource.data[index].delivered = false;
        this.dataSource._updateChangeSubscription();
        this.snackBar.open(error.error.message, "OK", {duration : 5000});
      });
  }

}