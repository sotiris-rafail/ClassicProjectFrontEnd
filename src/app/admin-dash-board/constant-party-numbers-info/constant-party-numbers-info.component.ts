import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { ConstantPartyNumbersInfoDataSource } from './constant-party-numbers-info-datasource';
import { AdminDashbordService } from '../adminDashboard.service';

@Component({
  selector: 'app-constant-party-numbers-info',
  templateUrl: './constant-party-numbers-info.component.html',
  styleUrls: ['./constant-party-numbers-info.component.css'],
  providers: [AdminDashbordService]
})
export class ConstantPartyNumbersInfoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ConstantPartyNumbersInfoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cpId', 'cpName', 'numberOfActives', 'numberOfBoxes'];
  constructor(private admindashboardService: AdminDashbordService) {

  }
  ngOnInit() {
    this.admindashboardService.getCPNumbers(sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.dataSource = new ConstantPartyNumbersInfoDataSource(response, this.sort);
      },
      error => {
        console.log(error)
      }
    );
  }

  getTotalMains() {
    if (this.dataSource != undefined) {
      return this.dataSource.data.map(t => t.numberOfActives).reduce((acc, value) => acc + value, 0);
    } else {
      return 0
    }
  }

  getTotalBoxes() {
    if (this.dataSource != undefined) {
      return this.dataSource.data.map(t => t.numberOfBoxes).reduce((acc, value) => acc + value, 0);
    } else {
      return 0;
    }
  }
}
