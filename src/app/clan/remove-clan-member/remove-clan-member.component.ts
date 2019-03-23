import { DisplayingErrorComponent } from './../../displaying-error/displaying-error.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RegisterCharacterService } from '../../homePage/member/addition-character-panel/registerCharacterService/registerCharacterService';

@Component({
  selector: 'app-remove-clan-member',
  templateUrl: './remove-clan-member.component.html',
  styleUrls: ['./remove-clan-member.component.css'],
  providers: [RegisterCharacterService]
})
export class RemoveClanMemberComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RemoveClanMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private characterService: RegisterCharacterService,
    private snackbar: MatSnackBar) {
    console.log(data.member)
  }


  ngOnInit() {
  }

  removeCharacterFromClan(member) {
    this.characterService.removeCharacterFromClan(member.characterId, sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: member.name + " removed successfully", type: "success" },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        setTimeout(function(){ location.reload(); }, 5000);
      },
      error => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: "alert" },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    )
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
