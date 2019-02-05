import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuth2Token } from '../tokens';
import { ClanService } from './clanService/clan.service';

@Component({
  selector: 'app-clan',
  templateUrl: './clan.template.html',
  styleUrls: ['./clan.style.css'],
  providers : [ClanService]
})
export class ClanComponent implements OnInit {
  previusUrl : String;
  whichToPrint : String = "CLAN"
  token : OAuth2Token = new OAuth2Token();
  clans=[{"name":"Perkunas1","numberOfMembers":3,"members":[{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"BOX","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"CPMEMBER"},{"name":"DrEnigma","level":77,"cpName":"KamiKaze","classOfCharacter":"EVA'S Saint","clanName":"Perkunas1","typeOfCharacter":"MAIN","typeOfUser":"LEADER"}]},{"name":"Perkunas2","numberOfMembers":0,"members":[]},{"name":"Perkunas3","numberOfMembers":0,"members":[]}]
  constructor(private router : Router, private clanService : ClanService) { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()) {
      this.clanService.getAllClansInfo(this.token.getAccessToken).subscribe(
        response =>{
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this.router.navigateByUrl("/");
    }
  }

  showInfo(link: any){
    console.log(link);
  }
}
