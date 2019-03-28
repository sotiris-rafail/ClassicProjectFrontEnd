import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersInfoDashboardDiaplyDataSource } from './users-info-dashboard-display-datasource';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-users-info-dashboard-display',
  templateUrl: './users-info-dashboard-display.component.html',
  styleUrls: ['./users-info-dashboard-display.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersInfoDashboardDisplayComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersInfoDashboardDiaplyDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new UsersInfoDashboardDiaplyDataSource(this.paginator, this.sort);
  }
}
