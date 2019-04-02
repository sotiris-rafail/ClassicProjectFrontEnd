import { MatDialogRef } from '@angular/material/dialog';
import { UnSoldItem } from './../auction.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-new-item-panel',
  templateUrl: './add-new-item-panel.component.html',
  styleUrls: ['./add-new-item-panel.component.css'],
  providers : [ItemService]
})
export class AddNewItemPanelComponent implements OnInit {
  maxPrice: number;
  grade: string;
  typeOfItem: string;
  nameControl = new FormControl('', [Validators.required]);
  amoundOfItemControl = new FormControl(1, [Validators.required, Validators.min(1)])
  maxPriceControl = new FormControl('', [Validators.required]);
  startingPriceControl = new FormControl('', [Validators.required]);
  bidPriceControl = new FormControl('', [Validators.required,Validators.min(0.1)]);
  numberOfDayControl = new FormControl(1, [Validators.required, Validators.min(1)])
  gradeControl = new FormControl('', [Validators.required]);
  typeOfItemControl = new FormControl('', [Validators.required]);
  addItemForm = new FormGroup({
    nameControl: this.nameControl,
    amoundOfItemControl: this.amoundOfItemControl,
    startingPriceControl: this.startingPriceControl,
    maxPriceControl: this.maxPriceControl,
    bidPriceControl: this.bidPriceControl,
    gradeControl: this.gradeControl,
    typeOfItemControl: this.typeOfItemControl});

  constructor(private itemsService : ItemService, private dialogRef : MatDialogRef<AddNewItemPanelComponent>, private snackBar : MatSnackBar) { }

  ngOnInit() {
  }

  changeStartingValue() {
    if (this.maxPrice != 0) {
      this.addItemForm.controls["startingPriceControl"].setValidators([Validators.required, Validators.max(this.maxPrice)]);
    }
    this.addItemForm.controls["startingPriceControl"].updateValueAndValidity();
  }

  changeMaxPriceValue() {
    this.addItemForm.controls["startingPriceControl"].setValidators([Validators.required, Validators.max(this.maxPrice)]);
    this.addItemForm.controls["startingPriceControl"].updateValueAndValidity();
  }

  addItem() {
    let unsoldItem : UnSoldItem ={
      'name' : String(this.nameControl.value),
      'startingPrice' : Number(this.startingPriceControl.value),
      'maxPrice' : Number(this.maxPriceControl.value),
      'currentValue' : Number(this.startingPriceControl.value),
      'bidStep' : Number(this.bidPriceControl.value),
      'photoPath' : "",
      'lastBidder' : "",
      'grade' : String(this.grade.toUpperCase()),
      'typeOfItem' : String(this.typeOfItem.toUpperCase()),
      'itemId' : NaN,
      'stateOfItem' : "Un Sold",
      'numberOfDays' : Number(this.numberOfDayControl.value)
    }
    this.itemsService.addNewItemForSale(unsoldItem, Number(this.amoundOfItemControl.value), sessionStorage.getItem("access_token")).subscribe(
      response => {console.log(response)},
      error => {this.snackBar.open(error.error.message, "OK", { duration : 5000, panelClass : 'alternate-theme'})}
    )
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
