import { MemberService } from './../memberService/member.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-change-member-role',
  templateUrl: './change-member-role.component.html',
  styleUrls: ['./change-member-role.component.css'],
  providers : [MemberService]
})
export class ChangeMemberRoleComponent implements OnInit {

  selectedValue : string;
  roles = [
    {value: '0', viewValue: 'CP Leader'},
    {value: '1', viewValue: 'CP Member'},
    {value: '2', viewValue: 'Super User'},
    {value: '3', viewValue: 'Raid Bosser'}
  ];

  constructor(public dialogRef: MatDialogRef<ChangeMemberRoleComponent>, @Inject(MAT_DIALOG_DATA) public data, private memberService : MemberService) {
    console.log(data)
   }

  ngOnInit() {
  }

  updateUser(){
    this.memberService.updateUserRole(this.data.member.characterId, this.selectedValue, sessionStorage.getItem("access_token")).subscribe(
      response => {
        window.location.reload();
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
