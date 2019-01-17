import { MemberService } from './memberService/member.service';
import { Component, OnInit } from '@angular/core';

const data = {"email":"e@e.e","typeOfUser":"CPMEMBER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"BOX","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":{"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0}}

@Component({
  selector: 'app-member',
  templateUrl: './member.template.html',
  styleUrls: ['./member.style.css'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {
  dataSource = []
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName' , 'typeOfCharacter', 'More'];
  email : string;
  cp : string;
  constructor(private memberService : MemberService) {

  }

  ngOnInit(): void {
    this.email = data.email;
    this.cp = data.responseConstantParty.cpName
    this.dataSource = data.chars;
  }

  handleRowClick(charId : string) {
    console.log(charId)
  }
}
