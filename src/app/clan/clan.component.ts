import { ChangeMemberRoleComponent } from './../homePage/member/change-member-role/change-member-role.component';
import { MemberService } from './../homePage/member/memberService/member.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { ClanService } from './clanService/clan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css'],
  providers: [ClanService, MemberService]
})
export class ClanComponent implements OnInit {
  previusUrl: String;
  whichToPrint: String = "CLAN"
  token: OAuth2Token = new OAuth2Token();
  clans: any = [];
  typeOfUser: any;
  isSuperUser: boolean = false;
  constructor(private router: Router, private clanService: ClanService, private memberService: MemberService, private dialog: MatDialog, private snackBar : MatSnackBar) { }

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
          console.log(error)
        }
      )
      this.clanService.getAllClansInfo(this.token.getAccessToken).subscribe(
        response => {
          this.clans = response;
        },
        error => {
          this.snackBar.open(error.error.message, "OK", {duration : 5000, panelClass : 'alternate-theme'})
        }
      )
    } else {
      this.router.navigateByUrl("/");
    }
  }

  showButton() {
    if (this.typeOfUser === "SUPERUSER") {
      this.isSuperUser = true;
    }
  }

  showInfo(member: any) {
    let dialogRef = this.dialog.open(ChangeMemberRoleComponent,
      {
        data: { member: member },
        disableClose: true
      });
  }
}
