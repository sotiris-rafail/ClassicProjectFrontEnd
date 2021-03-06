import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterCharacterService } from './registerCharacterService/registerCharacterService';
import { OAuth2Token } from '../../../tokens';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'addition-character-panel',
  templateUrl: './addition-character-panel.component.html',
  styleUrls: ['./addition-character-panel.component.css'],
  providers: [RegisterCharacterService, DisplayingErrorComponent]
})
export class AdditionCharacterPanelComponent implements OnInit {
  token: OAuth2Token = new OAuth2Token();
  selectedClan;
  selectedClass;
  selectedType;
  data: any;
  clans: Clan[] = [];
  classess: Clazz[] = []
  types: TypeOfCharacter[] = []

  charNameControl = new FormControl("", [Validators.required]);
  levelControl = new FormControl("", [Validators.required, Validators.max(85), Validators.min(1)]);
  clanControl = new FormControl("", [Validators.required]);
  classControl = new FormControl("", [Validators.required]);
  typeControl = new FormControl("", [Validators.required]);

  registerGroup = new FormGroup({
    charNameControl: this.charNameControl,
    levelControl: this.levelControl,
    clanControl: this.clanControl,
    classControl: this.classControl,
    typeControl: this.typeControl
  });
  constructor(public dialogRef: MatDialogRef<AdditionCharacterPanelComponent>, private registerCharacterService: RegisterCharacterService, private snackBar: MatSnackBar,
    private router : Router) { }

  ngOnInit() {
    this.token.getTokensFromStorage();
    if (this.token.isAccessTokenValid()) {
      this.registerCharacterService.getInfoToRegisterCharacter(this.token.getUser, this.token.getAccessToken).subscribe(infoResponse => {
        this.data = infoResponse
        this.data.Clan.forEach(clan => {
          this.clans.push({ value: clan.clanId, viewValue: clan.name })
        });
        let count = 0
        this.data.Classes.forEach(clazz => {
          this.classess.push({ value: count, viewValue: clazz });
          count++;
        });
        count = 0;
        this.data.HasMain.forEach(hasMain => {
          if (this.data.HasMain.length == 1) {
            count = 1;
          }
          this.types.push({ value: count, viewValue: hasMain });
          count++;
        });
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

  closeDialog() {
    this.dialogRef.close();
  }

  registerCharacter() {
    let character: RegisterCharacter = {
      'inGameName': this.registerGroup.getRawValue().charNameControl,
      'level': this.registerGroup.getRawValue().levelControl,
      'clanId': this.registerGroup.getRawValue().clanControl,
      'classOfCharacter': this.registerGroup.getRawValue().classControl,
      'typeOfCharacter': this.registerGroup.getRawValue().typeControl,
      'userId': this.token.getUser
    }
    this.registerCharacterService.registerCharacter(character, this.token.getAccessToken).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: character.inGameName + " has been added sucessfully", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        this.dialogRef.close(response);
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
          if(Number(error.status) == 401 ){
            this.router.navigateByUrl('/');
          }
      });
  }
}

export interface Clan {
  'value': number,
  'viewValue': String
}

export interface Clazz {
  'value': number,
  'viewValue': String
}

export interface TypeOfCharacter {
  'value': number,
  'viewValue': String
}

export interface RegisterCharacter {
  'inGameName': string,
  'level': number,
  'clanId': number,
  'classOfCharacter': number,
  'typeOfCharacter': number,
  'userId': number
}
