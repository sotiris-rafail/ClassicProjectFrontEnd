import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { OAuth2Token } from '../../tokens';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addition-member-panel',
  templateUrl: './addition-member-panel.component.html',
  styleUrls: ['./addition-member-panel.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent]
})
export class AdditionMemberPanelComponent implements OnInit {
  responseData: any;
  tokken: OAuth2Token = new OAuth2Token();
  @ViewChild("shoes") shoes: MatSelectionList;

  constructor(private cpService: ConstantPartyService, private dialogRef: MatDialogRef<AdditionMemberPanelComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.tokken.getTokensFromStorage();
    if (this.tokken.isAccessTokenValid()) {
      this.cpService.getUsersWithoutCp(this.tokken.getAccessToken).subscribe(response => {
        this.responseData = response;
      })
    }
  }

  addUsersToCp() {
    let usersToUpdate = [];
    this.shoes.selectedOptions.selected.forEach(select => {
      usersToUpdate.push(select.value)
    });
    let updateObject: UpdatableUser = {
      cpId: this.data.cpId,
      usersToUpdate: usersToUpdate
    };
    this.cpService.addUsersToCP(this.tokken.getAccessToken, updateObject).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: usersToUpdate.length + "added to CP successfully.", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarError',
            data: { message: error.error.message || error.error.error_description, type: 'error' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        if (Number(error.status) == 401) {
          this.router.navigateByUrl('/');
        }
      },
      () => {
        window.setTimeout(function () { this.close(); location.reload(); }, 1000);
      });
  }

  close() {
    this.dialogRef.close();
  }
}

export interface UpdatableUser {
  cpId: number,
  usersToUpdate: Array<Number>;
}