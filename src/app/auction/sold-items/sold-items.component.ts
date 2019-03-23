import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { SoldItem } from '../auction.component';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { ItemService } from '../item-service.service';

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
  @Input() isSuperUser : boolean;
  dataSource: MatTableDataSource<SoldItem>;
  displayedColumns = ['itemId', 'photoPath', 'name', 'typeOfItem', 'grade', 'stateOfItem', 'price', 'whoBoughtIt', 'boughtPrice', 'delivered', 'more'];
  constructor(private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.openSoldPanel();
  }
  ngOnChanges(){
    this.openSoldPanel();
  }

  openSoldPanel() {
    if (this._panelState) {
      this.itemService.getSoldItems(sessionStorage.getItem("access_token")).subscribe(
        response => {
          this.dataSource = new MatTableDataSource<SoldItem>(response);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.snackBar.open(error.error.message, "OK", { duration : 5000, panelClass : 'alternate-theme'})
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
        this.snackBar.open(error.error.message, "OK", {duration : 5000, panelClass : 'alternate-theme'});
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}