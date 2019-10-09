import { MemberService } from './../userService/member.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-member-role',
  templateUrl: './change-member-role.component.html',
  styleUrls: ['./change-member-role.component.css'],
  providers: [MemberService, DisplayingErrorComponent]
})
export class ChangeMemberRoleComponent implements OnInit {

  selectedValue: string;
  roles = [
    { value: '0', viewValue: 'CP Leader' },
    { value: '1', viewValue: 'CP Member' },
    { value: '2', viewValue: 'Super User' },
    { value: '3', viewValue: 'Raid Bosser' }
  ];

  constructor(public dialogRef: MatDialogRef<ChangeMemberRoleComponent>, @Inject(MAT_DIALOG_DATA) public data, private memberService: MemberService,
    private snackBar: MatSnackBar, private router: Router) {
      console.log(data)
    }

  ngOnInit() {}

  updateUser() {
    this.memberService.updateUserRole(this.data.member.characterId, this.selectedValue, sessionStorage.getItem("access_token")).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: this.data.member.name + "'s role was successfully changed to " + this.roles[this.selectedValue].viewValue, type: "success" },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
        this.dialogRef.close(this.roles[this.selectedValue].value);
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: "alert" },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (Number(error.status) == 401) {
          this.router.navigateByUrl('/');
        }
      }
    )
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
