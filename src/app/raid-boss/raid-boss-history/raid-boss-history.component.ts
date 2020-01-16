import { RaidBossComponent } from './../raid-boss.component';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-raid-boss-history',
  templateUrl: './raid-boss-history.component.html',
  styleUrls: ['./raid-boss-history.component.css']
})
export class RaidBossHistoryComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  baiumData //: RaidBossHistoryTableItem[];
  zakenData = 'zakenData';
  orfenData = 'orfenData';
  coreData = 'coreData';
  aqData = 'aqData';
  whichToPrint = 'RaidBossHistory';
  isSuperUser = 'RAIDBOSSER';
  //exampledata : RaidBossHistoryTableItem[] = [];
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { title: 'Baium', cols: 2, rows: 1, data: this.baiumData, id: 1 },
        { title: 'Zaken', cols: 2, rows: 1, data: this.zakenData, id: 2 },
        { title: 'Orfen', cols: 2, rows: 1, data: this.orfenData, id: 3 },
        { title: 'Core', cols: 2, rows: 1, data: this.coreData, id: 4 },
        { title: 'Queen Ant', cols: 2, rows: 1, data: this.aqData, id: 5 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
    // this.exampledata = [{'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Zaken'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Orfen'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Core'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'},
    // {'deathTimer' : new Date(), 'windowTimer': new Date(), 'aliveTimer': new Date(), 'raidbossName' : 'Baium'}];
  }
  ngOnInit() {
    //this.baiumData = this.exampledata.filter((item) => item.raidbossName === 'Baium');
  }
}
