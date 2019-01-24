
import { MemberService } from './memberService/member.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

const data = {"email":"e@e.e","typeOfUser":"LEADER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"BOX","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":{"cpId": 1,"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0}}

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
  constructor(private memberService : MemberService, public dialog: MatDialog, private router : Router) {

  }

  ngOnInit(): void {
    this.email = data.email;
    this.cpId = data.responseConstantParty.cpId;
    this.cp = data.responseConstantParty.cpName
    this.dataSource = data.chars;
    this.typeOfUser = data.typeOfUser
  }
}
