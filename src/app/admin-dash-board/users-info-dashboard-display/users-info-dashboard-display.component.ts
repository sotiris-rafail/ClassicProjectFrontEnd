import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { UsersInfoDashboardDiaplyDataSource as UsersInfoDashboardDisplayDataSource } from './users-info-dashboard-display-datasource';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AdminDashbordService } from '../adminDashboard.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

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
  providers : [AdminDashbordService, DisplayingErrorComponent]
})
export class UsersInfoDashboardDisplayComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsersInfoDashboardDisplayDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columnsToDisplay = ['userId', 'email', 'typeOfUser', 'cpName'];

  ngOnInit() {
    this.adminService.getUsersForDashboard(sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.dataSource = new UsersInfoDashboardDisplayDataSource(response, this.paginator, this.sort);
      }, error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
              duration: 5000,
              panelClass: 'snackBarError',
              data: { message: error.error.message || error.error.error_description, type: 'error' },
              horizontalPosition: 'right',
              verticalPosition: 'top'
          });
          if(Number(error.status) == 401 ){
            this.router.navigateByUrl('/');
          }
      }
    );
  }

  constructor(private adminService: AdminDashbordService, private snackBar: MatSnackBar, private router: Router) {}
}
