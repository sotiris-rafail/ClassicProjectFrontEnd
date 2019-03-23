import { DeletePanelComponent } from './delete-panel/delete-panel.component';
import { UpdateCharacterComponent } from './update-character/update-character.component';

import { MemberService } from './userService/member.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OAuth2Token } from 'src/app/tokens';
import { ItemService } from 'src/app/auction/item-service.service';

@Component({
  selector: 'member',
  templateUrl: './member.template.html',
  styleUrls: ['./member.style.css'],
  providers: [MemberService, ItemService]
})
export class MemberComponent implements OnInit {
  itemsOnSale : number = 0;
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
  constructor(private memberService: MemberService, public dialog: MatDialog, private router: Router, private itemService : ItemService) { }

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
      }, error => console.log(error.error.message))
      this.itemService.getNumberOfUnsoldItems(this.token.getAccessToken).subscribe(
        response => {
          this.itemsOnSale = response;
        }
      )
    } else {
      this.router.navigateByUrl("/");
    }
  }

  handleUpdate(character: any) {
    const dialogRef = this.dialog.open(UpdateCharacterComponent, {
      data: {
        'character': character
      },
      disableClose : true
    })
  }

  handleDelete(character: any) {
    const dialogRef = this.dialog.open(DeletePanelComponent, {
      data: {
        'character': character
      },
      disableClose : true
    })
  }
}
