import { ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnSoldItem, UnSoldItemEdit } from './../auction.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
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
  maxPriceControl = new FormControl('', [Validators.required]);
  startingPriceControl = new FormControl('', [Validators.required]);
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
  step = 0;
  items: UnSoldItem[] = [];
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor(private itemsService: ItemService, private dialogRef: MatDialogRef<AddNewItemPanelComponent>, private snackBar: MatSnackBar, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.setUpEditableItem(data);
    }
  }

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

  addItemToTheFinalList() {
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
        'numberOfDays': Number(this.numberOfDayControl.value),
        'amount': Number(this.amoundOfItemControl.value)
      }
    this.items.push(unsoldItem);
    this.setStep(3);
    this.cleanUpTheControllers();
  }

  cleanUpTheControllers() {
    this.nameControl.reset('');
    this.startingPriceControl.reset('');
    this.maxPriceControl.reset('');
    this.bidPriceControl.reset('');
    this.typeOfItemControl.reset('');
    this.gradeControl.reset('');
    this.amoundOfItemControl.reset(1);
    this.typeOfItemControl.reset('');
    this.numberOfDayControl.reset(1);
  }

  addItem() {
    this.itemsService.addNewItemForSale(this.items ,sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: this.items.length + " items added successfully.", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.dialogRef.close(true);
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
      }
    )
  }

  editItem() {
    let unsoldItemEdit: UnSoldItemEdit = {
      'name': String(this.nameControl.value),
      'startingPrice': Number(this.startingPriceControl.value),
      'maxPrice': Number(this.maxPriceControl.value),
      'bidStep': Number(this.bidPriceControl.value),
      'numberOfDays': Number(this.numberOfDayControl.value),
      'itemId': this.data.item.itemId
    }
    this.itemsService.editReSaleItem(unsoldItemEdit, sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: unsoldItemEdit.name + " edited successfully " + this.amoundOfItemControl.value + "time(s).", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        this.dialogRef.close();
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
      }
    )
  }

  handleCancel() {
    this.dialogRef.close(false);
  }

  private setUpEditableItem(data: any) {
    this.nameControl.setValue(data.item.name);
    this.startingPriceControl.setValue(data.item.startingPrice / 1000000);
    this.maxPriceControl.setValue(data.item.maxPrice / 1000000);
    this.bidPriceControl.setValue(data.item.bidStep / 1000000);
    this.typeOfItemControl.setValue(String(data.item.typeOfItem).toLowerCase());
    this.gradeControl.setValue(data.item.grade);
    this.amoundOfItemControl.disable();
    this.typeOfItemControl.disable();
    this.gradeControl.disable();
  }
}
