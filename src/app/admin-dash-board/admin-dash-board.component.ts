import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AdminDashbordService } from './adminDashboard.service';
import { CpPoints } from './epic-points-dashboard-display/epic-points-dashboard-display.component';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
  providers: [AdminDashbordService]
})
export class AdminDashBoardComponent implements OnInit {
  previusUrl: string = "";
  coreInfoPoints = [];
  orfenInfoPoints = [];
  aqInfoPoints = [];
  filter = "";
  whatToFilter = "Email";
  checked = false;
  ngOnInit(): void {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.adminService.getEpicPoints(sessionStorage.getItem("access_token")).subscribe(
      response => {
        response.forEach(cp => {
          this.coreInfoPoints.push({ cpId: Number(cp.cpId), cpName: String(cp.cpName), points: Number(cp.corePoints) });
          this.orfenInfoPoints.push({ cpId: Number(cp.cpId), cpName: String(cp.cpName), points: Number(cp.aqPoints) });
          this.aqInfoPoints.push({ cpId: Number(cp.cpId), cpName: String(cp.cpName), points: Number(cp.orfenPoints) });
        })
      }
    )

  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'User\'s Info', cols: 1, rows: 1, number: 1 },
          { title: 'Core Points', cols: 1, rows: 1, number: 2 },
          { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
          { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 },
          { title: 'CP Numbers Info', cols: 1, rows: 1, number: 5 }
        ];
      }

      return [
        { title: 'User\'s Info', cols: 2, rows: 1, number: 1 },
        { title: 'Core Points', cols: 1, rows: 1, number: 2 },
        { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
        { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 },
        { title: 'CP Numbers Info', cols: 1, rows: 1, number: 5 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private adminService: AdminDashbordService) { }

  applyFilter(value : string){
    this.filter = value;
  }

  changeSearch(){
    if(this.checked){
      this.whatToFilter = "Character";
    } else {
      this.whatToFilter = "Email";
    }
  }
}

export interface CP {
  cpId: number;
  cpName: string;
  orfenPoints: number;
  aqPoints: number;
  corePoints: number
}

export interface User {
  'userId': number,
  'email': string,
  'typeOfUser': string,
  'chars': Character[],
  'cpName': CP;
}

export interface Character {
  'charId' : number,
  'name': string,
  'level': number,
  'clanName': string,
  'classOfCharacter': string,
  'typeOfCharacter': string
}
