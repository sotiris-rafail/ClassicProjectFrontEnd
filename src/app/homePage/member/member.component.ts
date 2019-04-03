import { DeletePanelComponent } from './delete-panel/delete-panel.component';
import { UpdateCharacterComponent } from './update-character/update-character.component';

import { MemberService } from './userService/member.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OAuth2Token } from 'src/app/tokens';
import { ItemService } from 'src/app/auction/item-service.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'member',
  templateUrl: './member.template.html',
  styleUrls: ['./member.style.css'],
  providers: [MemberService, ItemService, DisplayingErrorComponent]
})
export class MemberComponent implements OnInit {
  itemsOnSale: number = 0;
  previusUrl: String = this.router.url;
  whichToPrint: String = "MEMBER"
  dataSource = []
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName', 'typeOfCharacter', 'More'];
  email: string;
  cp: string;
  cpId: number;
  typeOfUser: string;
  token: OAuth2Token = new OAuth2Token();
  data: any;
  constructor(private memberService: MemberService, public dialog: MatDialog, private router: Router, private itemService: ItemService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.memberService.fetchloggedUser(this.token.getUser, this.token.getAccessToken).subscribe(fetchedUser => {
        this.data = fetchedUser
        this.email = this.data.email;
        this.cpId = this.data.responseConstantParty.cpId;
        this.cp = this.data.responseConstantParty.cpName
        this.dataSource = this.data.chars;
        this.typeOfUser = this.data.typeOfUser
      }, error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: 'error' },
          duration: 5000,
          panelClass: ['snackBarError'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if(Number(error.status) == 401 ){
          this.router.navigateByUrl('/');
        }
      })
      this.itemService.getNumberOfUnsoldItems(this.token.getAccessToken).subscribe(
        response => {
          this.itemsOnSale = response;
        }
      )
    } else {
      this.snackBar.openFromComponent(DisplayingErrorComponent, {
        data: { message: 'Your token has expired. Please login again', type: 'alert' },
        duration: 5000,
        panelClass: ['snackBarAlert'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl("/");
    }
  }

  handleUpdate(character: any) {
    const dialogRef = this.dialog.open(UpdateCharacterComponent, {
      data: {
        'character': character
      },
      disableClose: true
    })
  }

  handleDelete(character: any) {
    const dialogRef = this.dialog.open(DeletePanelComponent, {
      data: {
        'character': character
      },
      disableClose: true
    })
  }
}
