import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSnackBar } from '@angular/material';
import { ConstantPartyNumbersInfoDataSource } from './constant-party-numbers-info-datasource';
import { AdminDashbordService } from '../adminDashboard.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-constant-party-numbers-info',
  templateUrl: './constant-party-numbers-info.component.html',
  styleUrls: ['./constant-party-numbers-info.component.css'],
  providers: [AdminDashbordService, DisplayingErrorComponent]
})
export class ConstantPartyNumbersInfoComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: ConstantPartyNumbersInfoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cpId', 'cpName', 'numberOfActives', 'numberOfBoxes'];
  constructor(private admindashboardService: AdminDashbordService, private snackBar: MatSnackBar, private router: Router) {

  }
  ngOnInit() {
    this.admindashboardService.getCPNumbers(sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.dataSource = new ConstantPartyNumbersInfoDataSource(response, this.sort);
      },
      error => {
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

  getTotalMains() {
    if (this.dataSource !== undefined) {
      return this.dataSource.data.map(t => t.numberOfActives).reduce((acc, value) => acc + value, 0);
    } else {
      return 0;
    }
  }

  getTotalBoxes() {
    if (this.dataSource !== undefined) {
      return this.dataSource.data.map(t => t.numberOfBoxes).reduce((acc, value) => acc + value, 0);
    } else {
      return 0;
    }
  }
}
