import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css']
})
export class ClanComponent implements OnInit {
  previusUrl : String;
  whichToPrint : String = "CLAN"
  clans=[{"name":"Perkunas1","numberOfMembers":3,"members":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"BOX","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"LEADER"}]},{"name":"Perkunas2","numberOfMembers":0,"members":[]},{"name":"Perkunas3","numberOfMembers":0,"members":[]}]
  constructor() { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
  }

  showInfo(link: any){
    console.log(link);
  }
}
