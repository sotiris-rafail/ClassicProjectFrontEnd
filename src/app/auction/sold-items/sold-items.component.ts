import { routeSlideUpToBottomStateForInnerUseTrigger } from './../../shared/route-animation';
import { AnimationEvent } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { SoldItem } from '../auction.component';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { ItemService } from '../item-service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { routeSlideUpToBottomStateTrigger } from 'src/app/shared/route-animation';

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.css'],
  providers: [ItemService],
  animations: [routeSlideUpToBottomStateTrigger, routeSlideUpToBottomStateForInnerUseTrigger]
})
export class SoldItemsComponent implements OnInit, OnChanges {
  @HostBinding('@routeSlideUpToBottomState') routeAnimation = true;
  private _panelState: Boolean = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Input()
  set panelState(value: Boolean) {
    this._panelState = value;
  }
  @Input() isSuperUser: Boolean;
  dataSource: MatTableDataSource<SoldItem> = new MatTableDataSource<SoldItem>();
  data: MatTableDataSource<SoldItem>;
  displayedColumns = ['itemId', 'photoPath', 'name', 'typeOfItem', 'grade', 'stateOfItem', 'price', 'whoBoughtIt', 'boughtPrice', 'delivered', 'more'];
  selection = new SelectionModel<SoldItem>(true, []);
  constructor(private itemService: ItemService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.openSoldPanel();
  }
  ngOnChanges() {
    this.openSoldPanel();
  }

  openSoldPanel() {
    if (this._panelState) {
      this.itemService.getSoldItems(sessionStorage.getItem('access_token')).subscribe(
        response => {
          this.data = new MatTableDataSource<SoldItem>(response);
          this.dataSource.paginator = this.paginator;
          if (this.data.data.length >= 1) {
            this.dataSource.data.push(this.data.data[0]);
            this.dataSource._updateChangeSubscription();
          }
        },
        error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
        }
      );
    } else {
      this.dataSource = new MatTableDataSource<SoldItem>([]);
    }
  }

  deliveryIt(item: SoldItem) {
    const index = this.dataSource.data.indexOf(item, 0);
    this.itemService.deliverSoldItem(this.dataSource.data[index].itemId, true, sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.dataSource.data[index].delivered = true;
        this.dataSource._updateChangeSubscription();
      },
      error => {
        this.dataSource.data[index].delivered = false;
        this.dataSource._updateChangeSubscription();
        this.snackBar.open(error.error.message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter(item => !item.delivered && item.whoBoughtIt === '').length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(
        row => {
          if (!row.delivered && row.whoBoughtIt === '') {
            this.selection.select(row)
          }
        });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SoldItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.itemId + 1}`;
  }

  renewItemsWithoutBuyer() {
    const renewItemsWithoutBuyer = [];
    this.selection.selected.forEach(row => {
      renewItemsWithoutBuyer.push(row.itemId);
    })
    this.itemService.renewItemsWithoutBuyer(renewItemsWithoutBuyer, sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.selection.selected.forEach(row => {
          this.dataSource.data.splice(this.dataSource.data.indexOf(row, 0), 1);
          this.selection.deselect(row);
        });
        this.dataSource._updateChangeSubscription();
      },
      error => {

      });
  }

  onAnimationDone(event: AnimationEvent, lastIndex: number) {
    if (event.fromState !== 'void') {
      return;
    }
    if (this.data.data.length == this.dataSource.data.length) {
      return;
    }
    if (this.data.data.length > lastIndex + 1) {
      if (this.dataSource.paginator.pageIndex >= 1) {
        lastIndex = lastIndex + (15 * this.dataSource.paginator.pageIndex);
      }
      this.dataSource.data.push(this.data.data[lastIndex + 1]);
      this.dataSource._updateChangeSubscription();
    }
  }
}
