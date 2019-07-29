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
  displayingView = [];
  aqAdjPrice = 0;
  orfenCoreAdjPrice = 0;
  constructor(private memberService: MemberService, public dialog: MatDialog, private router: Router, private itemService: ItemService, private snackBar: MatSnackBar) {
    this.displayingView['userId'] = 'ID';
    this.displayingView['email'] = 'Email';
    this.displayingView['typeOfUser'] = 'Type Of User';
    this.displayingView['cpName'] = 'CP Name';
    this.displayingView['MAIN'] = 'Main';
    this.displayingView['BOX'] = 'Box';
    this.displayingView['SUPERUSER'] = 'Super User';
    this.displayingView['CPMEMBER'] = 'CP Member';
    this.displayingView['RAIDBOSSER'] = 'Raid Bosser';
    this.displayingView['CPLEADER'] = 'CP Leader';
   }

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
        this.memberService.getEpicPointsPrice(this.token.getAccessToken).subscribe(response => {
          this.aqAdjPrice = response[0][1];
          this.orfenCoreAdjPrice = response[1][1];
        })
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
    });

    dialogRef.afterClosed().subscribe(updatedCharacher => {
      if(updatedCharacher) {
        let updatedCharIndex = this.dataSource.findIndex((character) => character.characterId === updatedCharacher.charId)
        this.dataSource[updatedCharIndex].name = updatedCharacher.inGameName !== null ? updatedCharacher.inGameName : this.dataSource[updatedCharIndex].name;
        this.dataSource[updatedCharIndex].level = updatedCharacher.level !== -1 ? updatedCharacher.level : this.dataSource[updatedCharIndex].level;
        this.dataSource[updatedCharIndex].clanName = updatedCharacher.clanId !== "-1" ? updatedCharacher.clanId : this.dataSource[updatedCharIndex].clanName;
        this.dataSource[updatedCharIndex].classOfCharacter = updatedCharacher.classOfCharacter !== "-1" ? updatedCharacher.classOfCharacter : this.dataSource[updatedCharIndex].classOfCharacter;
        this.dataSource[updatedCharIndex].typeOfCharacter = updatedCharacher.typeOfCharacter !== "-1" ? updatedCharacher.typeOfCharacter : this.dataSource[updatedCharIndex].typeOfCharacter;
      }
    })
  }

  handleDelete(character: any) {
    const dialogRef = this.dialog.open(DeletePanelComponent, {
      data: {
        'character': character
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(deletedChar => {
      if(deletedChar) {
        let deletedCharIndex = this.dataSource.findIndex((character) => character.characterId === deletedChar.characterId);
        this.dataSource.splice(deletedCharIndex, 1);
        this.dataSource = this.dataSource.slice(0, this.dataSource.length);
      }
    });
  }
}
