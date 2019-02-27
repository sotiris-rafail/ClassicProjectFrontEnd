import { MemberService } from './../homePage/member/memberService/member.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { UpdateTODComponent } from './update-tod/update-tod.component';
import { RaidBossService } from './raidBossService/raidBoss.service';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-raid-boss',
  templateUrl: './raid-boss.component.html',
  styleUrls: ['./raid-boss.component.css'],
  providers : [RaidBossService, MemberService]
})
export class RaidBossComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  whichToPrint : String = "RAIDS"
  token : OAuth2Token = new OAuth2Token();
  dataSource : any;
  previusUrl : String;
  displayedColumns =['name', 'level', 'windowStart', 'windowEnd', 'state', 'more'];
  actualDisplay :MatTableDataSource<RaidBoss> = new MatTableDataSource<RaidBoss>();
  typeOfUser : any;
  raidBosser : boolean = false;
  constructor(private dialog : MatDialog, private router : Router, private raidBossService : RaidBossService, private memberService : MemberService) {
    
  }

  ngOnInit() {
    this.previusUrl = "/user/"+sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()) {
      this.memberService.getRoleOfUser(Number(this.token.getUser), this.token.getAccessToken).subscribe(
        roleOfUser => {
          this.typeOfUser = roleOfUser;
          this.showButton();
      },
        error => {
          console.log(error)
        }
      )
      this.raidBossService.getALlBosses(this.token.getAccessToken).subscribe(
        response => {
          this.dataSource = response;
          this.actualDisplay.data = this.fixOutput(this.dataSource);
          this.actualDisplay.sort = this.sort;
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
          isAlive : raidboss.raidBossState,
          whereItLives : raidboss.whereItLives,
          windowStarts : new Date (raidboss.windowStarts),
          windowEnds : new Date (raidboss.windowEnds)
        }
        raidBosses.push(raid);
      })
      return raidBosses;
  }

  handleRowClick(id : number) {
    let clickedRaid : RaidBoss;
    this.actualDisplay.data.forEach(
      raid => {
        if(raid.raidBossId == id) {
          clickedRaid = raid;
        }
      }
    )
    this.dialog.open(UpdateTODComponent, {
      width : "300px", height : "630px",
      data : {
        raidBoss : clickedRaid,
        acces_tokken : this.token.getAccessToken
      }
    });
  }

  showButton(){
    if(this.typeOfUser === "SUPERUSER" || this.typeOfUser === "RAIDBOSSER") {
      this.raidBosser = true;
    }
    console.log(this.typeOfUser);
  }

  applyFilter(filterValue: string) {
    this.actualDisplay.filter = filterValue.trim().toLowerCase();
  }
}

export interface RaidBoss {
  raidBossId : number,
  level : number,
  name : string;
  isAlive : string,
  whereItLives : string,
  windowStarts : Date,
  windowEnds : Date
}