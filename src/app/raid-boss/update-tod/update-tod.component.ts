import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

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
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UpdateTODComponent implements OnInit {

  date = new FormControl(moment());
  hour = new FormControl();
  mins = new FormControl();
  timeZone = new FormControl();

  constructor() { }

  formGroup = new FormGroup({
   date : this.date,
   hour : this.hour,
   mins : this.mins,
   timeZone : this.timeZone
  });
  ngOnInit() {
  }

}