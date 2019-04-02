import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-re-sale-sold-item',
  templateUrl: './re-sale-sold-item.component.html',
  styleUrls: ['./re-sale-sold-item.component.css']
})
export class ReSaleSoldItemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReSaleSoldItemComponent>) { }

  maxPriceControl = new FormControl(this.data.price);
  startingPriceControl = new FormControl(this.data.boughtPrice);
  bidPriceControl = new FormControl('', [Validators.required, Validators.min(0.1)]);
  numberOfDayControl = new FormControl('', [Validators.required, Validators.min(1)]);

  addItemForm = new FormGroup({
    startingPriceControl: this.startingPriceControl,
    maxPriceControl: this.maxPriceControl,
    bidPriceControl: this.bidPriceControl,
    numberOfDayControl: this.numberOfDayControl
  });
  ngOnInit() {
  }

  reSaleItem() {
    console.log(this.data)
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
