import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { RegisterRaidBossComponent } from './register-raid-boss/register-raid-boss.component';


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
  dataSource =[];
  displayedColumns =['name', 'level', 'timeOfDeath', 'windowStart', 'windowEnd', 'more']
  constructor(private dialog : MatDialog) { }

  ngOnInit() {
     this.dataSource = data.sort((a,b) => (a.windowStart.localeCompare(b.windowStart)));
  }


  openDIalog(){
    const dialogRef = this.dialog.open(RegisterRaidBossComponent)
  }
}
