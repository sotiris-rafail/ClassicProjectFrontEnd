import { AnimationEvent } from '@angular/animations';
import { MemberService } from './../homePage/member/userService/member.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { ClanService } from './clanService/clan.service';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { routeSlideUpToBottomStateTrigger, routeSlideLeftToRightStateTrigger } from '../shared/route-animation';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css'],
  providers: [ClanService, MemberService, DisplayingErrorComponent],
  animations: [routeSlideLeftToRightStateTrigger]
})
export class ClanComponent implements OnInit {
  @HostBinding('@routeSlideLeftToRightState') routeAnimation = true;
  previusUrl: String;
  whichToPrint: String = "CLAN"
  token: OAuth2Token = new OAuth2Token();
  clans: any = [];
  beforeDisplay: any = [];
  typeOfUser: any;
  isSuperUser: boolean = false;
  displayingView = []
  constructor(private router: Router, private clanService: ClanService, private memberService: MemberService, private snackBar: MatSnackBar) {
    this.displayingView['MAIN'] = 'Main';
    this.displayingView['BOX'] = 'Box';
    this.displayingView['SUPERUSER'] = 'Super User';
    this.displayingView['CPMEMBER'] = 'CP Member';
    this.displayingView['RAIDBOSSER'] = 'Raid Bosser';
    this.displayingView['CPLEADER'] = 'CP Leader';
  }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.memberService.getRoleOfUser(Number(sessionStorage.getItem("userId")), this.token.getAccessToken).subscribe(
        roleOfUser => {
          this.typeOfUser = roleOfUser;
          this.showButton();
        },
        error => {
          this.snackBar.openFromComponent(DisplayingErrorComponent,
            {
              duration: 5000,
              panelClass: 'snackBarError',
              data: { message: error.error.message, type: 'error' },
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          if (Number(error.status) == 401) {
            this.router.navigateByUrl('/');
          }
        }
      )
      this.clanService.getAllClansInfo(this.token.getAccessToken).subscribe(
        response => {
          this.beforeDisplay = response;
          if (this.beforeDisplay.length >= 1) {
            this.clans.push(this.beforeDisplay[0]);
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
          if (Number(error.status) == 401) {
            this.router.navigateByUrl('/');
          }
        }
      )
    } else {
      this.snackBar.openFromComponent(DisplayingErrorComponent, {
        data: { message: 'Your token has expired. Please login again', type: 'alert' },
        duration: 5000,
        panelClass: ['snackBarAlert'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl("/");
    }
  }

  showButton() {
    if (this.typeOfUser === "SUPERUSER") {
      this.isSuperUser = true;
    }
  }

  onAnimationDone(event: AnimationEvent, lastIndex: number) {
    if (event.fromState != 'void') {
      return;
    }
    if (this.beforeDisplay.length > lastIndex + 1) {
      this.clans.push(this.beforeDisplay[lastIndex + 1]);
    } else {
      this.clans = this.beforeDisplay;
    }
  }
}
