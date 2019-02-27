import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { AdditionMemberPanelComponent } from '../addition-member-panel/addition-member-panel.component';
import { DeletePanelComponent } from '../delete-panel/delete-panel.component';
import { LeaderComponent } from '../homePage/leader/leader.component';
import { MatDialog } from '@angular/material/dialog';
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';
import { ConstantPartyService } from './constantPartyService/constantParty.service';

const data = {"cpName":"KamiKaze","numberOfActives":0,"numberOfBoxes":0,"orfenPoints":0,"corePoints":0,"aqPoints":0,"members":
[{"userId":"1","email":"e@e1.e","typeOfUser":"CPMEMBER","chars":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPLEADER"}],"responseConstantParty":null},
{"userId":"2","email":"e@e2.e","typeOfUser":"CPMEMBER","chars":[{"name":"manolis","level":22,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null},
{"userId":"9","email":"e@e3.e","typeOfUser":"CPLEADER","chars":[{"name":"ganis","level":33,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"}],"responseConstantParty":null}]};

@Component({
  selector: 'app-constantparty',
  templateUrl: './constantparty.component.html',
  styleUrls: ['./constantparty.component.css'],
  providers : [ConstantPartyService]
})
export class ConstantpartyComponent implements OnInit {

  private isMember : boolean;
  responseData : any;
  cpId : number;
  whichToPrint = "CP"
  isUserAleader : boolean = false;
  cp : string;
  dataSource2 = []
  cpLeader : string;
  token : OAuth2Token = new OAuth2Token();
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName' , 'typeOfCharacter', 'More'];
  previusUrl : string;
  constructor(private dialog : MatDialog, private router : Router, private cpService : ConstantPartyService) {
   }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    this.cpId = Number(this.router.url.split("/")[2]);
    if(this.token.isAccessTokenValid()) {
      this.cpService.getCpById(this.cpId, this.token.getAccessToken, this.token.getUser).subscribe(response => {
        this.responseData = response;
        this.UserPartyLeader(this.responseData.members);
        this.cpLeader = ConstantpartyComponent.getCPLeader(this.responseData.members);
        this.cp = this.responseData.cpName;
        this.dataSource2 = ConstantpartyComponent.getCPChars(this.responseData.members);

      }, error => {
        this.router.navigateByUrl(this.previusUrl)
      })
    } else {
      this.router.navigateByUrl("/");
    }
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

  private UserPartyLeader(members : any) : void {
    members.forEach(member =>{
      console.log(member)
      if(member.typeOfUser === "CPLEADER" || member.typeOfUser === "SUPERUSER") {
        if(!this.isUserAleader) {
          this.isUserAleader = sessionStorage.getItem("userId") == member.userId;
        }
      }
    });
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
