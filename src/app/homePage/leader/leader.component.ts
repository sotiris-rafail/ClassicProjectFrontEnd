import { DeleteMemberComponent } from './../../constantparty/delete-member/delete-member.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'leader',
  templateUrl: './leader.template.html',
  styleUrls: ['./leader.style.css']
})
export class LeaderComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  @Input() isUserAleader : boolean
  @Input() member : any;
  ngOnInit() {
  }

  handleDelete(member : any ) {
    const dialogRef = this.dialog.open(DeleteMemberComponent, {
      data : {
        'member' : member
      },
      disableClose : true
    });
  }
  
}
