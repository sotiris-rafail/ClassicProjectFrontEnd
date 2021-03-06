import { MemberService } from './../homePage/member/userService/member.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { UpdateTODComponent } from './update-tod/update-tod.component';
import { RaidBossService } from './raidBossService/raidBoss.service';
import { MatSort, MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { RegisterRaidBossComponent } from './register-raid-boss/register-raid-boss.component';
import { routeSlideLeftToRightStateRaidBossTrigger, routeSlideLeftToRightStateTrigger } from '../shared/route-animation';
import { AnimationEvent } from '@angular/animations'


@Component({
  selector: 'app-raid-boss',
  templateUrl: './raid-boss.component.html',
  styleUrls: ['./raid-boss.component.css'],
  providers: [RaidBossService, MemberService, DisplayingErrorComponent],
  animations: [routeSlideLeftToRightStateRaidBossTrigger, routeSlideLeftToRightStateTrigger]
})
export class RaidBossComponent implements OnInit {
  @HostBinding('@routeSlideLeftToRightState') routeAnimation = true;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  whichToPrint: String = 'RAIDS';
  token: OAuth2Token = new OAuth2Token();
  dataSource: any;
  previusUrl: string;
  displayedColumnsRaidBosser = ['name', 'level', 'windowStart', 'windowEnd', 'state', 'more', 'unknown'];
  displayedColumns = ['name', 'level', 'windowStart', 'windowEnd', 'state'];
  actualDisplay: MatTableDataSource<RaidBoss> = new MatTableDataSource<RaidBoss>();
  display: MatTableDataSource<RaidBoss> = new MatTableDataSource<RaidBoss>();
  typeOfUser: any;
  raidBosser = false;
  displayingView = [];
  constructor(private dialog: MatDialog, private router: Router, private raidBossService: RaidBossService, private memberService: MemberService, private snackBar: MatSnackBar) {
    this.displayingView['ALIVE'] = 'Alive';
    this.displayingView['ONWINDOW'] = 'On Window';
    this.displayingView['DEAD'] = 'Dead';
    this.displayingView['AAUNKNOWN'] = 'Unknown';
  }

  ngOnInit() {
    this.previusUrl = '/user/' + sessionStorage.getItem('userId');
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.memberService.isCpMember(Number(sessionStorage.getItem('userId')), sessionStorage.getItem('access_token')).subscribe(
        isCpMember => {
          if (isCpMember) {
            this.memberService.getRoleOfUser(Number(this.token.getUser), this.token.getAccessToken).subscribe(
              roleOfUser => {
                this.typeOfUser = roleOfUser;
                this.showButton();
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
              }
            );
            this.raidBossService.getALlBosses(this.token.getAccessToken).subscribe(
              response => {
                this.dataSource = response;
                this.display.data = this.fixOutput(this.dataSource);
                this.display.sort = this.sort;
                if (this.display.data.length >= 1) {
                  this.actualDisplay.data.push(this.display.data[0]);
                  this.actualDisplay.sort = this.sort;
                }
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
              });
          } else {
            this.snackBar.openFromComponent(DisplayingErrorComponent, {
              data: { message: 'You are not a CP member.', type: 'alert' },
              duration: 5000,
              panelClass: ['snackBarAlert'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.router.navigateByUrl(this.previusUrl);
          }
        },
        error => {

        });
    } else {
      this.snackBar.openFromComponent(DisplayingErrorComponent, {
        data: { message: 'Your token has expired. Please login again', type: 'alert' },
        duration: 5000,
        panelClass: ['snackBarAlert'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigate(['/'], { queryParams: { redirectPage: 'raidboss' } });
    }
  }

  private fixOutput(datasource) {
    const raidBosses = new Array<RaidBoss>();
    datasource.forEach(
      raidboss => {
        const raid: RaidBoss = {
          raidBossId: raidboss.raidBossId,
          level: raidboss.level,
          name: raidboss.name,
          isAlive: raidboss.raidBossState,
          whereItLives: raidboss.whereItLives,
          windowStarts: new Date(raidboss.windowStarts),
          windowEnds: new Date(raidboss.windowEnds)
        };
        raidBosses.push(raid);
      });
    return raidBosses;
  }

  handleRowClick(id: number) {
    let clickedRaid: RaidBoss;
    this.actualDisplay.data.forEach(
      raid => {
        if (raid.raidBossId === id) {
          clickedRaid = raid;
        }
      });
    const dialogref = this.dialog.open(UpdateTODComponent, {
      width: '300px', height: '630px',
      data: {
        raidBoss: clickedRaid,
        acces_tokken: this.token.getAccessToken
      },
      disableClose: true
    });

    dialogref.afterClosed().subscribe(updatedBoss => {
      if (updatedBoss) {
        const updatedBossIndex = this.actualDisplay.data.findIndex(raidboss => raidboss.raidBossId === updatedBoss.raidBossId);
        this.actualDisplay.data[updatedBossIndex].windowStarts = new Date(updatedBoss.windowStarts);
        this.actualDisplay.data[updatedBossIndex].windowEnds = new Date(updatedBoss.windowEnds);
        this.actualDisplay.data[updatedBossIndex].isAlive = updatedBoss.raidBossState;
        this.actualDisplay.data.sort((rb1, rb2) => rb1.isAlive > rb2.isAlive ? -1 : rb1.isAlive > rb2.isAlive ? 1 : 0);
        this.actualDisplay._updateChangeSubscription();
      }
    });
  }

  handleUnknowClick(id: number) {
    let clickedRaid: RaidBoss;
    this.actualDisplay.data.forEach(
      raid => {
        if (raid.raidBossId === id) {
          clickedRaid = raid;
          clickedRaid.isAlive = 'AAUNKNOWN';
        }
      });
    this.raidBossService.setToUnknown(sessionStorage.getItem('access_token'), String(clickedRaid.raidBossId)).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: clickedRaid.name + ' has been set to Unknown successfully.', type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        this.actualDisplay.data.sort((rb1, rb2) => rb1.isAlive > rb2.isAlive ? -1 : rb1.isAlive > rb2.isAlive ? 1 : 0);
        this.actualDisplay._updateChangeSubscription();
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
      }
    );
  }

  showButton() {
    if (this.typeOfUser === 'SUPERUSER' || this.typeOfUser === 'RAIDBOSSER') {
      this.raidBosser = true;
    }
  }

  applyFilter(filterValue: string) {
    this.actualDisplay.filter = filterValue.trim().toLowerCase();
  }

  onAnimationDone(event: AnimationEvent, lastIndex: number) {
    if (event.fromState !== 'void') {
      return;
    }
    if (this.display.data.length > lastIndex + 1) {
      this.actualDisplay.data.push(this.display.data[lastIndex + 1]);
      this.actualDisplay._updateChangeSubscription();
    } else {
      this.actualDisplay = this.display;
      this.actualDisplay._updateChangeSubscription();
    }

  }

  openRaidDialog() {
    const dialogRef = this.dialog.open(RegisterRaidBossComponent, { width: '330px', height: '430px', disableClose: true });

    dialogRef.afterClosed().subscribe(addRaidbosses => {
      if (addRaidbosses) {
        this.actualDisplay.data.push({
          raidBossId: addRaidbosses.raidBossId,
          level: addRaidbosses.level,
          name: addRaidbosses.name,
          isAlive: addRaidbosses.raidBossState,
          whereItLives: addRaidbosses.whereItLives,
          windowStarts: new Date(addRaidbosses.windowStarts),
          windowEnds: new Date(addRaidbosses.windowEnds)
        });
        this.actualDisplay._updateChangeSubscription();
      }
    });
  }
}

export interface RaidBoss {
  raidBossId: number;
  level: number;
  name: string;
  isAlive: string;
  whereItLives: string;
  windowStarts: Date;
  windowEnds: Date;
}
