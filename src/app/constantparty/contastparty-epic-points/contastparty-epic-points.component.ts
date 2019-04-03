import { Component, OnInit, Input } from '@angular/core';
import { ConstantPartyService } from '../constantPartyService/constantParty.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'contastparty-epic-points',
  templateUrl: './contastparty-epic-points.component.html',
  styleUrls: ['./contastparty-epic-points.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent]
})
export class ContastpartyEpicPointsComponent implements OnInit {

  @Input() aqPoints: number = 0;
  @Input() corePoints: number = 0;
  @Input() orfenPoints: number = 0;
  @Input() cpId: number = NaN;
  aqPointsToAdd = NaN;
  corePointsToAdd = NaN;
  orfenPointsToAdd = NaN;
  constructor(private constantPartyService: ConstantPartyService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  updatePoints(rb: string, pointsToAdd: number) {
    this.constantPartyService.updateEpicPoints(sessionStorage.getItem("access_token"), rb, pointsToAdd, this.cpId).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: rb + " points updated correclty. " + pointsToAdd + " added", type: 'success' },
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
      })
  }
}
