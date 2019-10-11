import { Component, OnInit, AfterViewInit, AfterContentInit, HostBinding } from '@angular/core';
import { AdditionMemberPanelComponent } from './addition-member-panel/addition-member-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';
import { ConstantPartyService } from './constantPartyService/constantParty.service';
import { DeleteMemberComponent } from './delete-member/delete-member.component';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';
import { routeFadeStateTrigger, routeSlideUpToBottomStateTrigger, routeSlideLeftToRightStateTrigger, routeSlideBottomToUpStateTrigger } from '../shared/route-animation';

const photo_path = "../../assets/upload/photos/";
@Component({
  selector: 'app-constantparty',
  templateUrl: './constantparty.component.html',
  styleUrls: ['./constantparty.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent],
  animations: [routeFadeStateTrigger, routeSlideUpToBottomStateTrigger, routeSlideLeftToRightStateTrigger, routeSlideBottomToUpStateTrigger]
})
export class ConstantpartyComponent implements OnInit {
  @HostBinding('@routeSlideUpToBottomState') routeAnimation = true;
  private isMember: boolean;
  responseData: any;
  cpId: number;
  whichToPrint = "CP"
  isUserAleader: boolean = false;
  cp: string;
  dataSource2 = []
  cpLeader: string;
  token: OAuth2Token = new OAuth2Token();
  displayedColumns: string[] = ['name', 'level', 'classOfCharacter', 'clanName', 'More'];
  previusUrl: string;
  constructor(private dialog: MatDialog, private router: Router, private cpService: ConstantPartyService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.previusUrl = "/user/" + sessionStorage.getItem("userId");
    this.token.getTokensFromStorage();
    this.cpId = Number(this.router.url.split("/")[2]);
    if (this.token.isAccessTokenValid()) {
      this.cpService.getCpById(this.cpId, this.token.getAccessToken, this.token.getUser).subscribe(response => {
        this.responseData = response;
        this.UserPartyLeader(this.responseData.members);
        this.cpLeader = ConstantpartyComponent.getCPLeader(this.responseData.members);
        this.cp = this.responseData.cpName;
        this.dataSource2 = ConstantpartyComponent.getCPChars(this.responseData.members);

      }, error => {
        this.router.navigateByUrl(this.previusUrl)
      })
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

  openDialog() {
    const dialogRef = this.dialog.open(AdditionMemberPanelComponent, { width: "530px", height: "530px" });
  }

  private static getCPChars(members: any) {
    let cpChars = [];
    members.forEach(member => {
      if (member.chars.length > 1) {
        member.chars.forEach(element => {
          cpChars.push(element)
        });
      } else if (member.chars.length == 1) {
        cpChars.push(member.chars[0])
      }
    });

    return cpChars;
  }

  private static getCPLeader(members: any) {
    let cpLeader;
    members.forEach(member => {
      if (member.typeOfUser === "CPLEADER") {
        member.chars.forEach(char => {
          if (char.typeOfCharacter === "MAIN") {
            cpLeader = char.name;
          }
        })
      }
    });
    return cpLeader;
  }

  private UserPartyLeader(members: any): void {
    members.forEach(member => {
      if (member.typeOfUser === "CPLEADER" || member.typeOfUser === "SUPERUSER") {
        if (!this.isUserAleader) {
          this.isUserAleader = sessionStorage.getItem("userId") == member.userId;
        }
      }
    });
  }

  openDialogMember() {
    const dialogRef = this.dialog.open(AdditionMemberPanelComponent, { width: "630px", height: "530px", data: { cpId: this.cpId }, disableClose: true });

    dialogRef.afterClosed().subscribe(addedMembers => {
      if(addedMembers) {
        let newChars = ConstantpartyComponent.getCPChars(addedMembers);
        newChars.forEach(element => {
          this.dataSource2.push(element);
        })
        this.dataSource2 = this.dataSource2.slice(0, this.dataSource2.length);
      }
    });
  }

  handleDelete(member : any) {
    const dialogRef = this.dialog.open(DeleteMemberComponent, {
      data : {
        'member' : member
      },
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(deletedMember => {
      if(deletedMember) {
        let deletedMemberIndex = this.dataSource2.findIndex((member) => member.characterId === deletedMember.characterId)
        this.dataSource2.splice(deletedMemberIndex, 1);
        this.dataSource2 = this.dataSource2.slice(0, this.dataSource2.length);
      }
    });
  }

}
