import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RegisterCharacterService } from '../addition-character-panel/registerCharacterService/registerCharacterService';
import { Clan, Clazz, TypeOfCharacter } from '../addition-character-panel/addition-character-panel.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-character',
  templateUrl: './update-character.component.html',
  styleUrls: ['./update-character.component.css'],
  providers: [RegisterCharacterService, DisplayingErrorComponent]
})
export class UpdateCharacterComponent implements OnInit {

  response: any;
  selectedClan;
  selectedClass;
  selectedType;
  clans: Clan[] = [];
  classess: Clazz[] = []
  types: TypeOfCharacter[] = []

  charNameControl = new FormControl();
  levelControl = new FormControl({ value: this.data.character.level, onlySelf: true }, [Validators.max(85), Validators.min(1)]);
  clanControl = new FormControl();
  classControl = new FormControl();
  typeControl = new FormControl();

  registerGroup = new FormGroup({
    charNameControl: this.charNameControl,
    levelControl: this.levelControl,
    clanControl: this.clanControl,
    classControl: this.classControl,
    typeControl: this.typeControl
  });
  constructor(private dialogRef: MatDialogRef<UpdateCharacterComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private charService: RegisterCharacterService,
    private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.charService.getInfoToRegisterCharacter(Number(sessionStorage.getItem("userId")), sessionStorage.getItem("access_token")).subscribe(infoResponse => {
      this.response = infoResponse
      this.response.Clan.forEach(clan => {
        this.clans.push({ value: clan.clanId, viewValue: clan.name });
      });
      let count = 0
      this.response.Classes.forEach(clazz => {
        this.classess.push({ value: count, viewValue: clazz });
        count++;
      });
      count = 0;
      this.response.HasMain.forEach(hasMain => {
        if (this.response.HasMain.length == 1) {
          count = 1;
        }
        this.types.push({ value: count, viewValue: hasMain });
        count++;
      });
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateCharacter() {
    let updateChar: CharacterUpdate = {
      'charId': this.data.character.characterId,
      'inGameName': this.charNameControl.value,
      'level': this.levelControl.value === undefined ? -1 : this.levelControl.value,
      'clanId': this.selectedClan === undefined ? -1 : this.selectedClan,
      'classOfCharacter': this.selectedClass === undefined ? -1 : this.selectedClass,
      'typeOfCharacter': this.selectedType === undefined ? -1 : this.selectedType,
    }
    this.charService.updateCharacer(updateChar, sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: this.data.character.name + " has been updated sucessfully", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        window.location.reload();
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
      })
  }
}

export interface CharacterUpdate {
  'charId': number,
  'inGameName': string,
  'level': number,
  'clanId': number,
  'classOfCharacter': number,
  'typeOfCharacter': number,
}

