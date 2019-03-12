import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-item-panel',
  templateUrl: './add-new-item-panel.component.html',
  styleUrls: ['./add-new-item-panel.component.css']
})
export class AddNewItemPanelComponent implements OnInit {
  startingPrice: number;
  maxPrice: number;
  grade: string;
  typeOfItem: string;
  nameControl = new FormControl('', [Validators.required]);
  amoundOfItemControl = new FormControl(1, [Validators.required, Validators.min(1)])
  maxPriceControl = new FormControl('', [Validators.required]);
  startingPriceControl = new FormControl('', [Validators.required]);
  bidPriceControl = new FormControl('', [Validators.required]);
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
    typeOfItemControl: this.typeOfItemControl,

  })
  constructor() { }

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
    console.log(this.grade.toUpperCase());
    console.log(this.typeOfItem.toUpperCase())
  }

  handleCancel() {

  }
}
