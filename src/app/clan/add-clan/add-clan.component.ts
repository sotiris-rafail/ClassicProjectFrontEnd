import { MatDialogRef } from '@angular/material';
import { ClanService } from './../clanService/clan.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-clan',
  templateUrl: './add-clan.component.html',
  styleUrls: ['./add-clan.component.css'],
  providers : [ClanService]
})
export class AddClanComponent implements OnInit {
  maxLevel = 5;
  minLevel = 1;
  constructor(private clanService : ClanService, private dialog : MatDialogRef<AddClanComponent>) { }

  clanName = new FormControl('',[Validators.required]);
  clanLevel = new FormControl('',[Validators.max(5), Validators.min(1)]);

  addClanGroup = new FormGroup({
    clanLevel : this.clanLevel,
    clanName : this.clanName
  });
  ngOnInit() {
  }

  addNewClan(){
    let clan : Clan = {
      'name' : String(this.addClanGroup.getRawValue().clanName)
    }
    this.clanService.addNewClan(sessionStorage.getItem("access_token"), clan).subscribe(
      response =>{
        window.location.reload();
      },
      error => {
        console.log(error);
      })
  }

  handleCancel(){
    this.dialog.close();
  }
}

export interface Clan {
  name : String
}