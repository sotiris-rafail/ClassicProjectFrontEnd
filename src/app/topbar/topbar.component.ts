import { Component, OnInit, Input } from '@angular/core';
import { AdditionCharacterPanelComponent } from '../addition-character-panel/addition-character-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  @Input() sidenav : MatSidenav;
  @Input() cp : String;
  @Input() cpId : number;
  @Input() email : String;
  @Input() typeOfUser : String;
  @Input() whichToPrint : String;
  @Input() cpLeader : String;
  @Input() isUserAleader : boolean;
  @Input() previusUrl : String;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDIalog(){
    const dialogRef = this.dialog.open(AdditionCharacterPanelComponent, {width : "530px", height : "530px"});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
