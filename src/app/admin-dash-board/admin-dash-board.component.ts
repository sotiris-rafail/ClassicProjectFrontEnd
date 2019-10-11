import { routeSlideBottomToUpStateTrigger } from './../shared/route-animation';
import { Component, OnInit, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AdminDashbordService } from './adminDashboard.service';
import { MemberService } from '../homePage/member/userService/member.service';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { Router } from '@angular/router';
import { routeSlideUpToBottomStateTrigger, routeSlideLeftToRightStateTrigger, routeSlideRightToLeftStateTrigger } from '../shared/route-animation';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
  providers: [AdminDashbordService, MemberService],
  animations: [routeSlideLeftToRightStateTrigger]
})
export class AdminDashBoardComponent implements OnInit {
  @HostBinding('@routeSlideLeftToRightState') routeAnimation = true;
  previusUrl: string = "";
  coreInfoPoints = [];
  orfenInfoPoints = [];
  aqInfoPoints = [];
  filter = "";
  whatToFilter = "Email";
  checked = false;
  cols : number = 0;
  isSuperUser: boolean = false;
  ngOnInit(): void {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.memberService.getRoleOfUser(Number(sessionStorage.getItem('userId')), sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.isSuperUser = String(response) === 'SUPERUSER';
        if(!this.isSuperUser) {
          this.snackBar.openFromComponent(DisplayingErrorComponent, {
            data: { message: 'Your role is not the expected', type: 'error' },
            duration: 5000,
            panelClass: ['snackBarError'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigateByUrl(this.previusUrl);
        }
      },
      error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
      })
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
        this.cols = 1;
        return [
          { title: 'User\'s Info', cols: 1, rows: 1, number: 1 },
          { title: 'Core Points', cols: 1, rows: 1, number: 2 },
          { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
          { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 },
          { title: 'CP Numbers Info', cols: 1, rows: 1, number: 5 }
        ];
      }
      this.cols = 2;
      return [
        { title: 'User\'s Info', cols: 2, rows: 1, number: 1 },
        { title: 'Core Points', cols: 1, rows: 1, number: 2 },
        { title: 'Orfen Points', cols: 1, rows: 1, number: 3 },
        { title: 'Queen Ant Points', cols: 1, rows: 1, number: 4 },
        { title: 'CP Numbers Info', cols: 1, rows: 1, number: 5 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private adminService: AdminDashbordService, 
    private memberService : MemberService, private snackBar : MatSnackBar, private router: Router) {}

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
  'userId': number;
  'email': string;
  'typeOfUser': string;
  'chars': Character[];
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
