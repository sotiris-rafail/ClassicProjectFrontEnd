import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ClanService } from './../clanService/clan.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clan',
  templateUrl: './add-clan.component.html',
  styleUrls: ['./add-clan.component.css'],
  providers : [ClanService, DisplayingErrorComponent]
})
export class AddClanComponent implements OnInit {
  maxLevel = 5;
  minLevel = 1;
  constructor(private clanService : ClanService, private dialog : MatDialogRef<AddClanComponent>, private snackbar : MatSnackBar, private router: Router) { }

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
      response => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: this.addClanGroup.getRawValue().clanName + " added successfully", type: "success" },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialog.close();
      },
      error => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: "alert" },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        if(Number(error.status) == 401 ){
          this.router.navigateByUrl('/');
        }
      });
  }

  handleCancel(){
    this.dialog.close();
  }
}

export interface Clan {
  name : String
}