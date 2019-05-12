import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-full-image-show',
  templateUrl: './full-image-show.component.html',
  styleUrls: ['./full-image-show.component.css']
})
export class FullImageShowComponent implements OnInit {
  url;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogref: MatDialogRef<FullImageShowComponent>) {
    this.url = data;
   }

  ngOnInit() {
  }

}
