import { ConstantPartyService } from './../constantPartyService/constantParty.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-constant-party',
  templateUrl: './add-new-constant-party.component.html',
  styleUrls: ['./add-new-constant-party.component.css'],
  providers : [ConstantPartyService, DisplayingErrorComponent]
})
export class AddNewConstantPartyComponent implements OnInit {
  maxLevel = 5;
  minLevel = 1;
  constructor(private cpService : ConstantPartyService, private dialog : MatDialogRef<AddNewConstantPartyComponent>, private snackbar : MatSnackBar, private router: Router) { }

  cpName = new FormControl('',[Validators.required]);

  addCPGroup = new FormGroup({
    cpName : this.cpName
  });
  ngOnInit() {
  }

  addNewCP(){
    let cp : CP = {
      'cpName' : String(this.addCPGroup.getRawValue().cpName)
    }
    this.cpService.addNewCP(sessionStorage.getItem("access_token"), cp).subscribe(
      response => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: this.addCPGroup.getRawValue().cpName + " added successfully", type: "success" },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialog.close();
      },
      error => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: "error" },
          duration: 5000,
          panelClass: ['snackBarError'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if(Number(error.status) == 401 ){
          this.router.navigateByUrl('/');
        }
      }
    )
  }

  handleCancel(){
    this.dialog.close();
  }
}

export interface CP {
  cpName : String
}

