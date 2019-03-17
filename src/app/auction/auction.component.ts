import { Component, OnInit } from '@angular/core';
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SoldItemsComponent } from './sold-items/sold-items.component';

@Component({
  selector: 'auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  token: OAuth2Token = new OAuth2Token();
  previusUrl: String;
  whichToPrint: String = "AUCTION";
  panelOpenStateUnSold = true;
  panelOpenStateSold = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {

    } else {
      this.router.navigateByUrl("/");
    }
  }

  handleOpenOrCloseUnSold(panelOpenState: boolean) {
      this.panelOpenStateUnSold = panelOpenState;
  }

  handleOpenOrCloseSold(panelOpenState: boolean) {
    this.panelOpenStateSold = panelOpenState;
}
}

export interface UnSoldItem {
  'itemId': number,
  'grade': String,
  'typeOfItem': String,
  'maxPrice': number,
  'startingPrice': number,
  'stateOfItem': String,
  'name': String,
  'numberOfDays': number,
  'bidStep': number,
  'currentValue': number,
  'lastBidder': String,
  'photoPath' : String
 }

export interface SoldItem {
  'itemId': number,
  'grade': String,
  'typeOfItem': String,
  'price': number,
  'stateOfItem': String,
  'whoBoughtIt': String,
  'boughtPrice': number,
  'name': String,
  'delivered': boolean,
  'photoPath' : String
}