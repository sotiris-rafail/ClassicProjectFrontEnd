import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConstantPartyService } from '../constantPartyService/constantParty.service';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css'],
  providers : [ConstantPartyService]
})
export class DeleteMemberComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteMemberComponent>,  @Inject(MAT_DIALOG_DATA) public data : any, private cpService : ConstantPartyService) { }

  ngOnInit() {
  }

  handleYes(characterId : number) {
    this.cpService.deleteMember(sessionStorage.getItem("access_token"), characterId).subscribe(
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
