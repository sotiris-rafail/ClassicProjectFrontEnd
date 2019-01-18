import { MemberService } from './memberService/member.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdditionCharacterPanelComponent } from 'src/app/addition-character-panel/addition-character-panel.component';

const data = {"email":"e@e.e","typeOfUser":"LEADER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"BOX","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":{"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0}}

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
  typeOfUser : string;
  constructor(private memberService : MemberService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.email = data.email;
    this.cp = data.responseConstantParty.cpName
    this.dataSource = data.chars;
    this.typeOfUser = data.typeOfUser
  }

  handleRowClick(charId : string) {
    console.log(charId)
  }

  openDIalog(){
    const dialogRef = this.dialog.open(AdditionCharacterPanelComponent, {width : "530px", height : "530px"});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
