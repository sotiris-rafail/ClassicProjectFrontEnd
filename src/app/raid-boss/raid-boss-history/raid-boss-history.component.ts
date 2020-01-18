import { MemberService } from './../../homePage/member/userService/member.service';
import { RaidBossService } from './../raidBossService/raidBoss.service';
import { RaidBossComponent } from './../raid-boss.component';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raid-boss-history',
  templateUrl: './raid-boss-history.component.html',
  styleUrls: ['./raid-boss-history.component.css'],
  providers: [RaidBossService, MemberService]
})
export class RaidBossHistoryComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  baiumData: RaidBossHistoryTableItem[];
  zakenData: RaidBossHistoryTableItem[];
  orfenData: RaidBossHistoryTableItem[];
  coreData: RaidBossHistoryTableItem[];
  aqData: RaidBossHistoryTableItem[];
  whichToPrint = 'RaidBossHistory';
  raidBosser = false;
  typeOfUser: any;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { title: 'Baium', cols: 2, rows: 1, data: this.baiumData, id: 1 },
        { title: 'Zaken', cols: 2, rows: 1, data: this.zakenData, id: 2 },
        { title: 'Orfen', cols: 2, rows: 1, data: this.orfenData, id: 3 },
        { title: 'Core', cols: 2, rows: 1, data: this.coreData, id: 4 },
        { title: 'Queen Ant', cols: 2, rows: 1, data: this.aqData, id: 5 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private raidbossService: RaidBossService,
    private snackBar: MatSnackBar, private router: Router, private memberService: MemberService) {
  }

  ngOnInit() {
    this.memberService.getRoleOfUser(Number(sessionStorage.getItem('userId')), sessionStorage.getItem('access_token')).subscribe(
      result => {
        this.typeOfUser = result;
        this.showButton();
      }
    )
    this.raidbossService.getRaidBossHistory(sessionStorage.getItem('access_token')).subscribe(
      results => {
        this.baiumData = results.filter((item) => item.raidbossName === 'Baium');
        this.zakenData = results.filter((item) => item.raidbossName === 'Zaken');
        this.orfenData = results.filter((item) => item.raidbossName === 'Orfen');
        this.coreData = results.filter((item) => item.raidbossName === 'Core');
        this.aqData = results.filter((item) => item.raidbossName === 'Queen Ant');
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
        if (Number(error.status) === 401) {
          this.router.navigateByUrl('/');
        }
      })
  }

  showButton() {
    console.log(this.typeOfUser)
    if (this.typeOfUser === 'SUPERUSER' || this.typeOfUser === 'RAIDBOSSER') {
      this.raidBosser = true;
    }
  }
}

export interface RaidBossHistoryTableItem {
  raidbossName: string;
  deathTimer: Date;
  windowTimer: Date;
  aliveTimer: Date;
}
