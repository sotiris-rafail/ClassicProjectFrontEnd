import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegisterCharacterService } from '../addition-character-panel/registerCharacterService/registerCharacterService';
import { Clan, Clazz, TypeOfCharacter } from '../addition-character-panel/addition-character-panel.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.css'],
  providers : [RegisterCharacterService]
})
export class UpdateCharacterComponent implements OnInit {
  
  selectedClan = "Perkuanas";
  selectedClass;
  selectedType;
  clans : Clan[] = [];
  classess : Clazz[]= []
  types : TypeOfCharacter[] = []

  charNameControl = new FormControl("",[Validators.required]);
  levelControl = new FormControl("",[Validators.required,Validators.max(85),Validators.min(1)]);
  clanControl = new FormControl("",[Validators.required]);
  classControl = new FormControl("",[Validators.required]);
  typeControl = new FormControl({value : this.data.character.typeOfCharacter},[Validators.required]);

  registerGroup = new FormGroup({
    charNameControl : this.charNameControl,
    levelControl : this.levelControl,
    clanControl : this.clanControl,
    classControl : this.classControl,
    typeControl : this.typeControl
  });
  constructor(private dialogRef: MatDialogRef<UpdateCharacterComponent>,  @Inject(MAT_DIALOG_DATA) public data : any, private charService : RegisterCharacterService) { 
    this.charNameControl.setValue(this.data.character.name);
    this.levelControl.setValue(this.data.character.level);
    this.clanControl.setValue(this.data.character.clanName);
    this.classControl.setValue(this.data.character.classOfCharacter);
    this.typeControl.setValue(this.data.character.typeOfCharacter);
  }

  ngOnInit() {
    this.clans.push({value : 1, viewValue :  this.data.character.clanName});
    this.classess.push({value : 1 , viewValue : this.data.character.classOfCharacter});
    this.types.push({value :1 , viewValue : this.data.character.typeOfCharacter});
    this.selectedClan = this.data.character.clanName;
    this.selectedClass = this.data.character.classOfCharacter;
    this.selectedType = this.data.character.typeOfCharacter;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  UpdateCharacter(){

  }

}
