import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersInfoDashboardDiaplyDataSource } from './users-info-dashboard-display-datasource';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AdminDashbordService } from '../adminDashboard.service';

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
  providers : [AdminDashbordService]
})
export class UsersInfoDashboardDisplayComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersInfoDashboardDiaplyDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['userId', 'email', 'typeOfUser', 'cpName'];

  ngOnInit() {
    this.adminService.getUsersForDashboard(sessionStorage.getItem("access_token")).subscribe(
      response => {
        console.log(response)
        this.dataSource = new UsersInfoDashboardDiaplyDataSource(this.paginator, this.sort);
        this.dataSource.data = response;
      }
    )
  }

  constructor(private adminService : AdminDashbordService){}
}
