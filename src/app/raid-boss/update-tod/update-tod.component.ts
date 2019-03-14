import { RaidBossService } from './../raidBossService/raidBoss.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RaidBoss } from '../raid-boss.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-update-tod',
  templateUrl: './update-tod.component.html',
  styleUrls: ['./update-tod.component.css'],
  providers: [ RaidBossService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UpdateTODComponent implements OnInit {
  @ViewChild('datePicker') datePicker: ElementRef;
  maxDate = new Date();
  minDate = new Date(2019,0,1);
  date = new FormControl(moment());
  hour = new FormControl('00',[ Validators.max(23), Validators.min(0), Validators.required]);
  mins = new FormControl('00',[ Validators.max(59), Validators.min(0), Validators.required]);

  constructor(public dialogRef: MatDialogRef<UpdateTODComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private raidBossService : RaidBossService) {}

  formGroup = new FormGroup({
   date : this.date,
   hour : this.hour,
   mins : this.mins
  });
  finalDate : string;
  ngOnInit() {}

  updateTOD(){
    let dateString : string = new Date(this.datePicker.nativeElement.value).toISOString().split('T')[0];
    let splitDate = dateString.split('-');
    console.log(new Date(Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2])+1))
    this.finalDate = new Date(Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2])+1, this.formGroup.getRawValue().hour, this.formGroup.getRawValue().mins).toISOString();
    this.raidBossService.updateTOD(this.data.acces_tokken, this.data.raidBoss.raidBossId, this.finalDate).subscribe(
      response => {
        window.setTimeout(function(){location.reload()}, 5000)
      },
      error => {
        console.log(error)
      }
    )
  }

  handleCancel(){
    this.dialogRef.close();
  }
}