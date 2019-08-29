import { AddUserToCpFromClanPageComponent } from './../constantparty/add-user-to-cp-from-clan-page/add-user-to-cp-from-clan-page.component';
import { ChangeMemberRoleComponent } from './../homePage/member/change-member-role/change-member-role.component';
import { MemberService } from './../homePage/member/userService/member.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { ClanService } from './clanService/clan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { RemoveClanMemberComponent } from './remove-clan-member/remove-clan-member.component';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css'],
  providers: [ClanService, MemberService, DisplayingErrorComponent]
})
export class ClanComponent implements OnInit {
  previusUrl: String;
  whichToPrint: String = "CLAN"
  token: OAuth2Token = new OAuth2Token();
  clans: any = [];
  typeOfUser: any;
  isSuperUser: boolean = false;
  displayingView = []
  constructor(private router: Router, private clanService: ClanService, private memberService: MemberService, private dialog: MatDialog, private snackBar: MatSnackBar) { 
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
          this.clans = response;
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
}
