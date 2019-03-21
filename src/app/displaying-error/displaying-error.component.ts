import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-displaying-error',
  templateUrl: './displaying-error.component.html',
  styleUrls: ['./displaying-error.component.css']
})
export class DisplayingErrorComponent {
  message = "";
  type : string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) data : any) { 
    this.message = data.message;
    this.type = data.type;
  }
}
