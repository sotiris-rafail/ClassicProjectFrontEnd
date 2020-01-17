import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ZakenHistoryTableDataSource, ZakenHistoryTableItem } from './zaken-history-table-datasource';

@Component({
  selector: 'app-zaken-history-table',
  templateUrl: './zaken-history-table.component.html',
  styleUrls: ['./zaken-history-table.component.css']
})
export class ZakenHistoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ZakenHistoryTableItem>;
  dataSource: ZakenHistoryTableDataSource;
  @Input() data :ZakenHistoryTableItem[] ;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['deathTimer', 'windowTimer', 'aliveTimer'];

  ngOnInit() {
    this.dataSource = new ZakenHistoryTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
