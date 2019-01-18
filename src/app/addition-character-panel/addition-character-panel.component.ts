import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'addition-character-panel',
  templateUrl: './addition-character-panel.component.html',
  styleUrls: ['./addition-character-panel.component.css']
})
export class AdditionCharacterPanelComponent implements OnInit {

  selectedClan;
  selectedClass;
  clans = [
    {value: '1', viewValue: 'Prkunas1'},
    {value: '2', viewValue: 'Prkunas2'},
    {value: '3', viewValue: 'Prkunas3'}
  ]

  classess = [
    {value: '1', viewValue: 'EE'},
    {value: '2', viewValue: 'SE'},
    {value: '3', viewValue: 'DA'}
  ]

  types = [
    {value: '1', viewValue: 'BOX'},
    {value: '2', viewValue: 'MAIN'}
  ]
  constructor(public dialogRef: MatDialogRef<AdditionCharacterPanelComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
