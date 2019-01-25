
import { MemberService } from './memberService/member.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OAuth2Token } from 'src/app/tokens';

@Component({
  selector: 'member',
  templateUrl: './member.template.html',
  styleUrls: ['./member.style.css'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {
  previusUrl : String = this.router.url;
  whichToPrint : String = "MEMBER"
  dataSource = []
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName' , 'typeOfCharacter', 'More'];
  email : string;
  cp : string;
  cpId : number;
  typeOfUser : string;
  token : OAuth2Token = new OAuth2Token();
  data : any;
  constructor(private memberService : MemberService, public dialog: MatDialog, private router : Router) {}

  ngOnInit(): void {
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()){
      this.memberService.fetchloggedUser(this.token.getUser, this.token.getAccessToken).subscribe(fetchedUser =>{
       this.data = fetchedUser
       this.email = this.data.email;
        this.cpId = this.data.responseConstantParty.cpId;
        this.cp = this.data.responseConstantParty.cpName
        this.dataSource = this.data.chars;
        this.typeOfUser = this.data.typeOfUser
      })
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
