import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ConstantPartyService } from '../constantPartyService/constantParty.service';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.css'],
  providers: [ConstantPartyService, DisplayingErrorComponent]
})
export class DeleteMemberComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cpService: ConstantPartyService,
    private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
  }

  handleYes(characterId: number) {
    this.cpService.deleteMember(sessionStorage.getItem("access_token"), characterId).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: "Member deleted successfully.", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.dialogRef.close(this.data.member);
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: error.error.message || error.error.error_description, type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          if(Number(error.status) == 401 ){
            this.router.navigateByUrl('/');
          }
      })
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
