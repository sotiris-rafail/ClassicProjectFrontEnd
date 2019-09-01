import { MemberService } from './../../homePage/member/userService/member.service';
import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatSelect, MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-to-cp-from-clan-page',
  templateUrl: './add-user-to-cp-from-clan-page.component.html',
  styleUrls: ['./add-user-to-cp-from-clan-page.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent, MemberService]
})
export class AddUserToCpFromClanPageComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddUserToCpFromClanPageComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cpService: ConstantPartyService,
    private snackBar: MatSnackBar, private memberService: MemberService, private router: Router) { }

  @ViewChild(MatSelect) matSelect: MatSelect;
  cps: CP[] = [];
  selectedValue = '';
  ngOnInit() {
    this.cpService.getCPIdName(sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.cps = response;
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: 'alert' },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (Number(error.status) === 401 ) {
          this.router.navigateByUrl('/');
        }
      }
    );
    this.cps = [];
  }

  doSomething() {
    this.selectedValue = this.matSelect.value;
  }

  addSingleUserToCP(member) {
    const cpId = this.cps.find((cp) => cp.cpName.toLowerCase() === this.selectedValue.toLowerCase()).cpId;
    this.memberService.addSingleUserToCP(member.characterId, cpId, sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: member.name + ' was successfully added to ' + this.selectedValue + ' CP', type: 'success' },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: 'alert' },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (Number(error.status) === 401 ) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  handleCancel() {
    this.dialogRef.close();
  }

}

export interface CP {
  cpId: number;
  cpName: string;
}
