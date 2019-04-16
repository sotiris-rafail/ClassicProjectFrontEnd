import { ConstantPartyService } from './../constantparty/constantPartyService/constantParty.service';
import { AddNewConstantPartyComponent } from './../constantparty/add-new-constant-party/add-new-constant-party.component';
import { AddNewItemPanelComponent } from './../auction/add-new-item-panel/add-new-item-panel.component';
import { AdditionMemberPanelComponent } from '../constantparty/addition-member-panel/addition-member-panel.component';
import { Component, OnInit, Input } from '@angular/core';
import { AdditionCharacterPanelComponent } from '../homePage/member/addition-character-panel/addition-character-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { RegisterRaidBossComponent } from '../raid-boss/register-raid-boss/register-raid-boss.component';
import { AddClanComponent } from '../clan/add-clan/add-clan.component';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent]
})
export class TopbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() itemsOnSale: number = 0;
  @Input() cp: string;
  @Input() cpId: number;
  @Input() email: String;
  @Input() typeOfUser: String;
  @Input() whichToPrint: String = '';
  @Input() cpLeader: String;
  @Input() isUserAleader: boolean;
  @Input() previusUrl: String;
  @Input() isSuperUser: boolean;
  @Input() lengthOfChars: Number = 0;
  constructor(public dialog: MatDialog, private cpService: ConstantPartyService, private snackBar : MatSnackBar, private router : Router) { }

  ngOnInit() {
    if (this.cpId == -1) {
      this.cpId = NaN;
    }
  }

  openDialogCharacter() {
    const dialogRef = this.dialog.open(AdditionCharacterPanelComponent, { width: "530px", height: "530px", disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogMember() {
    const dialogRef = this.dialog.open(AdditionMemberPanelComponent, { width: "630px", height: "530px", data: { cpId: this.cpId }, disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openRaidDialog() {
    const dialogRef = this.dialog.open(RegisterRaidBossComponent, { width: "330px", height: "430px", disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddClanDialog() {
    const dialogRef = this.dialog.open(AddClanComponent, { width: "330px", height: "300px", disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addNewItem() {
    const dialogRef = this.dialog.open(AddNewItemPanelComponent, { width: "550px", height: "600px", disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddCPDialog() {
    const dialogRef = this.dialog.open(AddNewConstantPartyComponent, { width: "330px", height: "250px", disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.cpService.uploadImage(file, sessionStorage.getItem('access_token'), this.cpId, this.cp).subscribe(
        (res) => {
          console.log(res)
        },
        (err) => {
          this.snackBar.openFromComponent(DisplayingErrorComponent, {
            data: { message: err.error.message, type: 'error' },
            duration: 5000,
            panelClass: ['snackBarError'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        })
    });
    reader.readAsDataURL(file);
  }

  navigate(url: string, extra? : number){
    if(extra > 0 ){
      url = url + String(extra);
    }
    this.router.navigateByUrl(url);
  }
}
