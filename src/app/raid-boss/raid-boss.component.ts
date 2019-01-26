import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';


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
  styleUrls: ['./raid-boss.component.css']
})
export class RaidBossComponent implements OnInit {

  whichToPrint : String = "RAIDS"
  token : OAuth2Token = new OAuth2Token();
  dataSource =[];
  previusUrl : String;
  displayedColumns =['name', 'level', 'timeOfDeath', 'windowStart', 'windowEnd', 'more'];
  
  constructor(private dialog : MatDialog, private router : Router) {}

  ngOnInit() {
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()) {
      this.previusUrl = "/user/"+sessionStorage.getItem("userId");
      this.dataSource = data.sort((a,b) => (a.windowStart.localeCompare(b.windowStart)));
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
