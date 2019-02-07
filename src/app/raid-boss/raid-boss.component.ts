import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { UpdateTODComponent } from './update-tod/update-tod.component';
import { RaidBossService } from './raidBossService/raidBoss.service';
import { Identifiers } from '@angular/compiler';


const data = [
  {"name": "Baium", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : false},
  {"name": "orfen", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : true},
  {"name": "core", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : false},
  {"name": "Ant Queen", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : true},
  {"name": "Decar", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : false},
  {"name": "Ipos", "level": "52", "timeOfDeath" : "", "windowStart" : "" , "windowEnd" : "", "isAlive" : true}
]

@Component({
  selector: 'app-raid-boss',
  templateUrl: './raid-boss.component.html',
  styleUrls: ['./raid-boss.component.css'],
  providers : [RaidBossService]
})
export class RaidBossComponent implements OnInit {

  whichToPrint : String = "RAIDS"
  token : OAuth2Token = new OAuth2Token();
  dataSource : any;
  previusUrl : String;
  displayedColumns =['name', 'level', 'windowStart', 'windowEnd', 'windowStartJP', 'windowEndJP' , 'more'];
  actualDisplay :Array<RaidBoss> = []
  constructor(private dialog : MatDialog, private router : Router, private raidBossService : RaidBossService) {}

  ngOnInit() {
    this.previusUrl = "/user/"+sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()) {
      this.raidBossService.getALlBosses(this.token.getAccessToken).subscribe(
        response => {
          this.dataSource = response;
          console.log(this.dataSource)
          this.actualDisplay = this.fixOutput(this.dataSource);
        },
        error => {

        }
      );
    } else {
      this.router.navigateByUrl("/");
    }
  }

  private fixOutput (datasource) {
    let raidBosses = new Array<RaidBoss>();
    let date = new Date().getTimezoneOffset();
    datasource.forEach(
      raidboss =>{
        let raid : RaidBoss = {
          raidBossId : raidboss.raidBossId,
          level : raidboss.level,
          name : raidboss.name,
          isAlive : raidboss.alive,
          whereItLives : raidboss.whereItLives,
          windowStarts : new Date (raidboss.windowStarts ).toLocaleString(),
          windowEnds : new Date (raidboss.windowEnds).toLocaleString(),
          windowStartsJP : new Date (raidboss.windowStartsJP).toLocaleString(),
          windowEndsJP : new Date (raidboss.windowEndsJP).toLocaleString()
        }
        raidBosses.push(raid);
      })
      return raidBosses;
  }

  handleRowClick(id : number){
    console.log(this.actualDisplay[id-1])
    this.dialog.open(UpdateTODComponent, {
      width : "330px", height : "530px"
    });
  }
}

interface RaidBoss {
  raidBossId : number,
  level : number,
  name : string;
  isAlive : boolean,
  whereItLives : string,
  windowStarts : string,
  windowEnds : string,
  windowStartsJP : string,
  windowEndsJP : string
}
