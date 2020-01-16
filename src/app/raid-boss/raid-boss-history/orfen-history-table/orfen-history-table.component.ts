import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { OrfenHistoryTableDataSource, OrfenHistoryTableItem } from './orfen-history-table-datasource';

@Component({
  selector: 'app-orfen-history-table',
  templateUrl: './orfen-history-table.component.html',
  styleUrls: ['./orfen-history-table.component.css']
})
export class OrfenHistoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<OrfenHistoryTableItem>;
  dataSource: OrfenHistoryTableDataSource;
  @Input() data;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new OrfenHistoryTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
