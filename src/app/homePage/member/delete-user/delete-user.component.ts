import { MemberService } from './../userService/member.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatTooltip } from '@angular/material';
import { Router } from '@angular/router';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  providers: [MemberService, DisplayingErrorComponent]
})
export class DeleteUserComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private memberService: MemberService,
  private snackbar: MatSnackBar, private router: Router) {
   }

  ngOnInit() {
  }

  deleteUser(user_id){
    this.memberService.deleteUser(user_id, sessionStorage.getItem('access_token')).subscribe(
      response => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: this.data.email +" has been successfully deleted", type: "success" },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.dialogRef.close({user_id: user_id, button: true});
      },
      error => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: "alert" },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.dialogRef.close({button: false});
      }
    )
  }

  handleCancel() {
    this.dialogRef.close({button: false});
  }

}
