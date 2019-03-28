import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EpicPointsDashboardDiaplyDataSource } from './epic-points-dashboard-display-datasource';

@Component({
  selector: 'app-epic-points-dashboard-display',
  templateUrl: './epic-points-dashboard-display.component.html',
  styleUrls: ['./epic-points-dashboard-display.component.css']
})
export class EpicPointsDashboardDisplayComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EpicPointsDashboardDiaplyDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'more'];

  ngOnInit() {
    this.dataSource = new EpicPointsDashboardDiaplyDataSource(this.paginator, this.sort);
  }
}
