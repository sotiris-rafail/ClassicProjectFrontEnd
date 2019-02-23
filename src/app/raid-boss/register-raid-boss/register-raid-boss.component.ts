import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RaidBossService } from '../raidBossService/raidBoss.service';


@Component({
  selector: 'app-register-raid-boss',
  templateUrl: './register-raid-boss.component.html',
  styleUrls: ['./register-raid-boss.component.css'],
  providers : [RaidBossService]
})
export class RegisterRaidBossComponent implements OnInit {
  minHour = 0;
  maxLevel = 75;
  minLevel = 1;
  raidName = new FormControl('', [Validators.required]);
  raidLevel = new FormControl('', [Validators.required, Validators.max(this.maxLevel), Validators.min(this.minLevel)]);
  windowStart = new FormControl('', [Validators.required, Validators.min(this.minHour)]);
  windowEnd = new FormControl('', [Validators.required, Validators.min(this.minHour)])
  addRaidBossGroup = new FormGroup({
    raidName : this.raidName,
    raidLevel : this.raidLevel,
    windowStart : this.windowStart,
    windowEnd : this.windowEnd
  });
  constructor(private raidService : RaidBossService) { }
  ngOnInit() {
  }

  addRaidBoss(){
    let raidBoss : RaidBoss = {
      'name' : this.addRaidBossGroup.getRawValue().raidName,
      'level' : Number(this.addRaidBossGroup.getRawValue().raidLevel),
      'windowStarts' : RegisterRaidBossComponent.calculateWindows(this.addRaidBossGroup.getRawValue().windowStart),
      'windowEnds' :  RegisterRaidBossComponent.calculateWindows(this.addRaidBossGroup.getRawValue().windowEnd),
    }
    this.raidService.addNewRaid(sessionStorage.getItem("access_token"), raidBoss).subscribe(
      response => {window.location.reload()},
      error => {console.log(error)}
    )
  }

  private static calculateWindows(window : string) {
    let hours = Number(window); 
    let days;
    let remainingHours;
    if(hours > 24) {
      days = (hours/24) - (( hours % 24 ) / 24);
      if((24*days) < hours){
        remainingHours = hours - (24 * days);
      } else {
        remainingHours = (24 * days) - hours;
      }
      if(days < 10) {
        days = "0"+days
      }
      if(remainingHours < 10){
        remainingHours = "0"+remainingHours;
      }
    } else {
      days = "00";
      remainingHours = hours;
      if(remainingHours < 10){
        remainingHours = "0"+remainingHours;
      }
    }
    return "" + days + ":" + remainingHours+""
  }
}

export interface RaidBoss {
  level : number,
  name : string;
  windowStarts : string,
  windowEnds : string
}