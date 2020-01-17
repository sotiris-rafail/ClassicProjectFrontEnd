import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BaiumHistoryTableDataSource, BaiumHistoryTableItem } from './baium-history-table-datasource';

@Component({
  selector: 'app-baium-history-table',
  templateUrl: './baium-history-table.component.html',
  styleUrls: ['./baium-history-table.component.css']
})
export class BaiumHistoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<BaiumHistoryTableItem>;
  dataSource: BaiumHistoryTableDataSource;
  @Input() data;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['deathTimer', 'windowTimer', 'aliveTimer'];

  ngOnInit() {
    this.dataSource = new BaiumHistoryTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
