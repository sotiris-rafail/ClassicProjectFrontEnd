import { ChangeMemberRoleComponent } from './../homePage/member/change-member-role/change-member-role.component';
import { MemberService } from './../homePage/member/memberService/member.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { ClanService } from './clanService/clan.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css'],
  providers : [ClanService, MemberService]
})
export class ClanComponent implements OnInit {
  previusUrl : String;
  whichToPrint : String = "CLAN"
  token : OAuth2Token = new OAuth2Token();
  clans : any =[];
  typeOfUser : any;
  isSuperUser : boolean = false;
  constructor(private router : Router, private clanService : ClanService, private memberService : MemberService, private dialog : MatDialog) { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    this.memberService.getRoleOfUser(Number(sessionStorage.getItem("userId")), this.token.getAccessToken).subscribe(
      roleOfUser => {
        this.typeOfUser = roleOfUser;
        this.showButton();
    },
      error => {
        console.log(error)
      }
    )
    if(this.token.isAccessTokenValid()) {
      this.clanService.getAllClansInfo(this.token.getAccessToken).subscribe(
        response =>{
          console.log(response)
          this.clans = response;
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.router.navigateByUrl("/");
    }
  }

  showButton(){
    if(this.typeOfUser === "SUPERUSER") {
      this.isSuperUser = true;
    }
    console.log(this.typeOfUser);
  }

  showInfo(member: any){
    let dialogRef = this.dialog.open(ChangeMemberRoleComponent,
      {data : {member : member}});
  }
}
