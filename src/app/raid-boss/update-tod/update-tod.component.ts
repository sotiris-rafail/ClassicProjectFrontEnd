import { RaidBossService } from './../raidBossService/raidBoss.service';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
  providers: [RaidBossService, DisplayingErrorComponent,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class UpdateTODComponent implements OnInit {
  @ViewChild('datePicker', {static: true}) datePicker: ElementRef;
  maxDate = new Date();
  minDate = new Date(2019, 0, 1);
  date = new FormControl(moment());
  hour = new FormControl('00', [Validators.max(23), Validators.min(0), Validators.required]);
  mins = new FormControl('00', [Validators.max(59), Validators.min(0), Validators.required]);

  constructor(public dialogRef: MatDialogRef<UpdateTODComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private raidBossService: RaidBossService,
    private snackBar: MatSnackBar, private router: Router) { }

  formGroup = new FormGroup({
    date: this.date,
    hour: this.hour,
    mins: this.mins
  });
  finalDate: Date;
  ngOnInit() { }

  updateTOD() {
    console.log()
    let dateString = new Date(this.datePicker.nativeElement.value).toISOString().split('T')[0];
    let splitDate = dateString.split('-');
    this.finalDate = new Date(Number(splitDate[0]), Number(splitDate[1]) - 1);
    this.finalDate.setDate(Number(splitDate[2]));
    this.finalDate.setHours(Number(this.formGroup.getRawValue().hour), Number(this.formGroup.getRawValue().mins));
    this.raidBossService.updateTOD(this.data.acces_tokken, this.data.raidBoss.raidBossId, this.finalDate.toISOString()).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: this.data.raidBoss.name + "'s TOD has been updated sucessfully", type: 'success' },
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
        if (Number(error.status) == 401) {
          this.router.navigateByUrl('/');
        }
      }
    )
  }

  handleCancel() {
    this.dialogRef.close();
  }
}