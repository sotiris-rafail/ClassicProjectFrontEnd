import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { OAuth2Token } from '../../tokens';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-addition-member-panel',
  templateUrl: './addition-member-panel.component.html',
  styleUrls: ['./addition-member-panel.component.css'], 
  providers : [ ConstantPartyService]
})
export class AdditionMemberPanelComponent implements OnInit {
  responseData : any;
  tokken : OAuth2Token = new OAuth2Token();
  @ViewChild("shoes")shoes : MatSelectionList;

  constructor(private cpService : ConstantPartyService, private dialogRef: MatDialogRef<AdditionMemberPanelComponent>,  @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
    this.tokken.getTokensFromStorage();
    if(this.tokken.isAccessTokenValid()) {
      this.cpService.getUsersWithoutCp(this.tokken.getAccessToken).subscribe(response => {
        this.responseData = response;
      })
    }
  }

  addUsersToCp(){
    let usersToUpdate = [];
    this.shoes.selectedOptions.selected.forEach(select => {
      usersToUpdate.push(select.value)
    });
    let updateObject : UpdatableUser = {
      cpId : this.data.cpId,
      usersToUpdate : usersToUpdate
    };
    this.cpService.addUsersToCP(this.tokken.getAccessToken, updateObject).subscribe(
      response => response,
      error => console.log(error),
      () => {
        window.setTimeout(function(){this.close();location.reload();},1000);
    });
  }

  close(){
    this.dialogRef.close();
  }
}

export interface UpdatableUser {
  cpId : number,
  usersToUpdate : Array<Number>;
}