import { Component, OnInit } from '@angular/core';
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  token : OAuth2Token = new OAuth2Token();
  previusUrl : String;
  whichToPrint : String = "AUCTION";
  panelOpenState = false;
  subject = new Subject<boolean>();
  constructor(private router : Router) { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {

    } else {
      this.router.navigateByUrl("/");
    }
  }

  handleOpenOrClose(panelOpenState : boolean){
    this.subject.next(panelOpenState);
  }
}

export interface UnSoldItems {
  'itemId' : number,
  'grade' : String,
  'typeOfItem' : String,
  'price' : String,
  'stateOfitem' : String,
  'name' : String
}

export interface SoldItems {
  'itemId' : number,
  'grade' : String,
  'typeOfItem' : String,
  'price' : String,
  'stateOfitem' : String,
  'whoBoughtIt' : String,
  'boughtPrice' : String,
  'name' : String
}