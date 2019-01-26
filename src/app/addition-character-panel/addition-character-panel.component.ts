import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterCharacterService } from './registerCharacterService/registerCharacterService';
import { OAuth2Token } from '../tokens';

@Component({
  selector: 'addition-character-panel',
  templateUrl: './addition-character-panel.component.html',
  styleUrls: ['./addition-character-panel.component.css'],
  providers : [RegisterCharacterService]
})
export class AdditionCharacterPanelComponent implements OnInit {
  token : OAuth2Token = new OAuth2Token();
  selectedClan;
  selectedClass;
  selectedType;
  data : any;
  clans : Clan[] = [];
  classess : Clazz[]= []
  types : TypeOfCharacter[] = []

  charNameControl = new FormControl("",[Validators.required]);
  levelControl = new FormControl("",[Validators.required]);
  clanControl = new FormControl("",[Validators.required]);
  classControl = new FormControl("",[Validators.required]);
  typeControl = new FormControl("",[Validators.required]);

  registerGroup = new FormGroup({
    charNameControl : this.charNameControl,
    levelControl : this.levelControl,
    clanControl : this.clanControl,
    classControl : this.classControl,
    typeControl : this.typeControl
  });
  constructor(public dialogRef: MatDialogRef<AdditionCharacterPanelComponent>, private registerCharacterService : RegisterCharacterService) { }

  ngOnInit() {
    this.token.getTokensFromStorage();
    if(this.token.isAccessTokenValid()) {
      this.registerCharacterService.getInfoToRegisterCharacter(this.token.getUser, this.token.getAccessToken).subscribe(infoResponse => {
        this.data = infoResponse
        this.data.Clan.forEach(clan => {
          this.clans.push({value : clan.clanId, viewValue : clan.name})
        });
        let count = 0
        this.data.Classes.forEach(clazz => {
          this.classess.push({value : count, viewValue : clazz});
          count++;
        });
        count = 0;
        this.data.HasMain.forEach(hasMain => {
          this.types.push({value : count, viewValue : hasMain});
          count++;
        });
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  registerCharacter(){
    console.log(this.registerGroup.getRawValue());
    this.closeDialog();
    window.location.reload();
  }

 
}

export interface Clan {
  'value' : number,
  'viewValue' : String
}

export interface Clazz {
  'value' : number,
  'viewValue' : String
}

export interface TypeOfCharacter {
  'value' : number,
  'viewValue' : String
}
