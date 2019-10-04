import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { MemberService } from '../homePage/member/userService/member.service';
import { OAuth2Token } from '../tokens';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css'],
  providers: [MemberService]
})
export class AuctionComponent implements OnInit {
  isSuperUser: boolean = false;
  token: OAuth2Token = new OAuth2Token();
  previusUrl: string;
  whichToPrint: String = 'AUCTION';
  panelOpenStateUnSold = true;
  panelOpenStateSold = false;
  isCpMember;
  constructor(private router: Router, private memberService: MemberService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.previusUrl = '/user/' + sessionStorage.getItem('userId');
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.memberService.isCpMember(Number(sessionStorage.getItem('userId')), sessionStorage.getItem('access_token')).subscribe(
        isCpMember => {
          this.isCpMember = isCpMember;
          if (isCpMember) {
            this.memberService.getRoleOfUser(Number(sessionStorage.getItem('userId')), sessionStorage.getItem('access_token')).subscribe(
              response => {
                this.isSuperUser = String(response) === 'SUPERUSER';
              },
              error => {
                this.snackBar.open(error.error.message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
              })
          } else {
            this.snackBar.openFromComponent(DisplayingErrorComponent, {
              data: { message: 'You are not a CP member.', type: 'alert' },
              duration: 5000,
              panelClass: ['snackBarAlert'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.router.navigateByUrl(this.previusUrl);
          }
        },
        error => {
          this.snackBar.open(error.error.message, 'OK', { duration: 5000, panelClass: 'alternate-theme' });
        });
    } else {
      this.snackBar.openFromComponent(DisplayingErrorComponent, {
        data: { message: 'Your token has expired. Please login again', type: 'alert' },
        duration: 5000,
        panelClass: ['snackBarAlert'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl('/');
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
  'itemId': number;
  'grade': String;
  'typeOfItem': String;
  'maxPrice': number;
  'startingPrice': number;
  'stateOfItem': String;
  'name': String;
  'numberOfDays': number;
  'bidStep': number;
  'currentValue': number;
  'lastBidder': String;
  'photoPath': String;
}

export interface UnSoldItemEdit {
  'itemId': number;
  'maxPrice': number;
  'startingPrice': number;
  'name': String;
  'numberOfDays': number;
  'bidStep': number;
}

export interface SoldItem {
  'itemId': number;
  'grade': String;
  'typeOfItem': String;
  'price': number;
  'stateOfItem': String;
  'whoBoughtIt': String;
  'boughtPrice': number;
  'name': String;
  'delivered': boolean;
  'photoPath': String;
}
