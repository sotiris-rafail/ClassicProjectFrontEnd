import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CoreHistoryTableDataSource, CoreHistoryTableItem } from './core-history-table-datasource';

@Component({
  selector: 'app-core-history-table',
  templateUrl: './core-history-table.component.html',
  styleUrls: ['./core-history-table.component.css']
})
export class CoreHistoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<CoreHistoryTableItem>;
  dataSource: CoreHistoryTableDataSource;
  @Input() data;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['deathTimer', 'windowTimer', 'aliveTimer'];

  ngOnInit() {
    this.dataSource = new CoreHistoryTableDataSource();
    this.dataSource.data = this.data;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
