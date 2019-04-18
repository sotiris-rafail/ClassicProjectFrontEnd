import { ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UnSoldItem } from './../auction.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ItemService } from '../item-service.service';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-item-panel',
  templateUrl: './add-new-item-panel.component.html',
  styleUrls: ['./add-new-item-panel.component.css'],
  providers: [ItemService, DisplayingErrorComponent]
})
export class AddNewItemPanelComponent implements OnInit {
  maxPrice: number;
  grade: string;
  typeOfItem: string;
  nameControl = new FormControl('', [Validators.required]);
  amoundOfItemControl = new FormControl(1, [Validators.required, Validators.min(1)])
  maxPriceControl = new FormControl([Validators.required]);
  startingPriceControl = new FormControl([Validators.required]);
  bidPriceControl = new FormControl('', [Validators.required, Validators.min(0.1)]);
  numberOfDayControl = new FormControl(1, [Validators.required, Validators.min(1)])
  gradeControl = new FormControl({ value: '', disabled: (this.typeOfItem === 'book') }, [Validators.required]);
  typeOfItemControl = new FormControl('', [Validators.required]);
  addItemForm = new FormGroup({
    nameControl: this.nameControl,
    amoundOfItemControl: this.amoundOfItemControl,
    startingPriceControl: this.startingPriceControl,
    maxPriceControl: this.maxPriceControl,
    bidPriceControl: this.bidPriceControl,
    gradeControl: this.gradeControl,
    typeOfItemControl: this.typeOfItemControl
  }, { updateOn: 'change' });
  errors = [];
  constructor(private itemsService: ItemService, private dialogRef: MatDialogRef<AddNewItemPanelComponent>, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.addItemForm.controls['typeOfItemControl'].valueChanges.subscribe(response => {
      this.onBookSelect(response);
    });
    this.startingPriceControl.valueChanges.subscribe(() => {
      this.validateStartingAndMaxPrice();
    })
    this.maxPriceControl.valueChanges.subscribe(() => {
      this.validateStartingAndMaxPrice();
    });
  }

  private onBookSelect(response: string) {
    if (response === 'book') {
      this.gradeControl.disable();
      this.grade = 'NONE';
    } else {
      this.gradeControl.enable();
    }
  }

  private validateStartingAndMaxPrice() {
    if (this.startingPriceControl.value == null) {
      this.startingPriceControl.setErrors({ required: true });
    } else if (this.maxPriceControl.value == null) {
      this.maxPriceControl.setErrors({ required: true });
    } else if (this.startingPriceControl.value > this.maxPriceControl.value) {
      this.startingPriceControl.setErrors({ max: true });
    } else if (this.startingPriceControl.value < this.maxPriceControl.value) {
      this.startingPriceControl.updateValueAndValidity({ onlySelf: false, emitEvent: false });
    }
  }

  addItem() {
    let unsoldItem: UnSoldItem = {
      'name': String(this.nameControl.value),
      'startingPrice': Number(this.startingPriceControl.value),
      'maxPrice': Number(this.maxPriceControl.value),
      'currentValue': Number(this.startingPriceControl.value),
      'bidStep': Number(this.bidPriceControl.value),
      'photoPath': "",
      'lastBidder': "",
      'grade': this.grade ? String(this.grade.toUpperCase()) : "NONE",
      'typeOfItem': String(this.typeOfItem.toUpperCase()),
      'itemId': NaN,
      'stateOfItem': "Un Sold",
      'numberOfDays': Number(this.numberOfDayControl.value)
    }
    this.itemsService.addNewItemForSale(unsoldItem, Number(this.amoundOfItemControl.value), sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: unsoldItem.name + " added successfully " + this.amoundOfItemControl.value + "time(s).", type: 'success' },
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
          if(Number(error.status) == 401 ){
            this.router.navigateByUrl('/');
          }
      }
    )
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
