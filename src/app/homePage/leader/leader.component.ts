import { DeletePanelComponent } from './../../delete-panel/delete-panel.component';
import { AdditionMemberPanelComponent } from './../../addition-member-panel/addition-member-panel.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

const data = {"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0,"members":[{"email":"e@e1.e","typeOfUser":"CPLEADER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPLEADER"}],"responseConstantParty":null},{"email":"e@e2.e","typeOfUser":"CPMEMBER","chars":[{"name":"manolis","level":22,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null},{"email":"e@e3.e","typeOfUser":"CPMEMBER","chars":[{"name":"ganis","level":33,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null}]};

@Component({
  selector: 'leader',
  templateUrl: './leader.template.html',
  styleUrls: ['./leader.style.css']
})
export class LeaderComponent implements OnInit {

  isUserAleader : boolean = false;
  cp : string;
  dataSource2 = []
  cpLeader : string;
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName' , 'typeOfCharacter', 'More'];
  constructor(private dialog : MatDialog) { }

  ngOnInit() {
    this.UserPartyLeader(data.members);
    this.cpLeader = LeaderComponent.getCPLeader(data.members);
    this.cp = data.cpName;
    this.dataSource2 = LeaderComponent.getCPChars(data.members);
  }

  openDialog(){
    const dialogRef = this.dialog.open(AdditionMemberPanelComponent, {width : "530px", height : "530px"});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private static getCPChars(members : any) {
    let cpChars = [];
    members.forEach(member => {
      if(member.chars.length > 1) {
        member.chars.forEach(element => {
          cpChars.push(element)
        });
      } else if (member.chars.length == 1) {
        cpChars.push(member.chars[0])
      }
    });

    return cpChars;
  }

  private static getCPLeader(members : any) {
    let cpLeader;
    members.forEach(member =>{
      if(member.typeOfUser === "CPLEADER"){
        member.chars.forEach(char => {
          if(char.typeOfCharacter === "MAIN"){
            cpLeader =  char.name;
          }
        })
      }
    });
    return cpLeader;
  }

  UserPartyLeader(members : any) : void {
    let cpLeader;
    members.forEach(member =>{
      if(member.typeOfUser === "CPLEADER"){
        //an to mail kai id einai idia me auta sto store tote exoume ton leader
      }
    });
    return;
  }

  handleUpdate(charId : string) {
    const dialogRef = this.dialog.open(AdditionMemberPanelComponent);

  }

  handleDelete(charId : string) {
    const dialogRef = this.dialog.open(DeletePanelComponent);
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
  
}
