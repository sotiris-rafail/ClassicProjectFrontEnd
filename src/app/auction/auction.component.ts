import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SoldItemsComponent } from './sold-items/sold-items.component';
import { MemberService } from '../homePage/member/memberService/member.service';

@Component({
  selector: 'auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  providers: [MemberService]
})
export class AuctionComponent implements OnInit {
  isSuperUser : boolean;
  token: OAuth2Token = new OAuth2Token();
  previusUrl: String;
  whichToPrint: String = "AUCTION";
  panelOpenStateUnSold = true;
  panelOpenStateSold = false;
  constructor(private router: Router, private memberService : MemberService, private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.memberService.getRoleOfUser(Number(sessionStorage.getItem("userId")), sessionStorage.getItem("access_token")).subscribe(
        response => {
          this.isSuperUser = String(response) === "SUPERUSER";
        },
        error => {
          this.snackBar.open(error.error.message, "OK", {duration : 5000})
        }
      )
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