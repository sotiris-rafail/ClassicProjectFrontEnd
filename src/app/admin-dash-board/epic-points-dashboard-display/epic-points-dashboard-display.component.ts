import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-epic-points-dashboard-display',
  templateUrl: './epic-points-dashboard-display.component.html',
  styleUrls: ['./epic-points-dashboard-display.component.css']
})
export class EpicPointsDashboardDisplayComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<CpPoints>;
  @Input() data: CpPoints[] = [];
  firstTime = false;
  // @Input() set data(value: any) {
  //   this._data = value;
  // }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cpId', 'cpName', 'points', 'more'];

  ngOnInit() {
    this.firstTime = true;
    this.dataSource = new MatTableDataSource<CpPoints>(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue != undefined) {
      this.dataSource.data = changes.data.currentValue;
      this.dataSource._updateChangeSubscription();
    }
  }

  constructor() {
  }
}

export interface CpPoints {
  'cpId': number,
  'cpName': string,
  'points': number
}
