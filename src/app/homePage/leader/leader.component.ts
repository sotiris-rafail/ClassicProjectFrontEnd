import { DeleteMemberComponent } from './../../constantparty/delete-member/delete-member.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const data = {"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0,"members":[{"email":"e@e1.e","typeOfUser":"CPLEADER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPLEADER"}],"responseConstantParty":null},{"email":"e@e2.e","typeOfUser":"CPMEMBER","chars":[{"name":"manolis","level":22,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null},{"email":"e@e3.e","typeOfUser":"CPMEMBER","chars":[{"name":"ganis","level":33,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null}]};

@Component({
  selector: 'leader',
  templateUrl: './leader.template.html',
  styleUrls: ['./leader.style.css']
})
export class LeaderComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  @Input() isUserAleader : boolean
  @Input() member : any;
  ngOnInit() {
  }

  handleDelete(member : any ) {
    const dialogRef = this.dialog.open(DeleteMemberComponent, {
      data : {
        'member' : member
      }
    });
  }
  
}
