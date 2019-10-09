import { DisplayingErrorComponent } from './../../displaying-error/displaying-error.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RegisterCharacterService } from '../../homePage/member/addition-character-panel/registerCharacterService/registerCharacterService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-clan-member',
  templateUrl: './remove-clan-member.component.html',
  styleUrls: ['./remove-clan-member.component.css'],
  providers: [RegisterCharacterService]
})
export class DeleteCharacterComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteCharacterComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private characterService: RegisterCharacterService,
    private snackbar: MatSnackBar, private router: Router) {
  }


  ngOnInit() {
  }

  removeCharacterFromClan(member) {
    this.characterService.deleteCharacter(sessionStorage.getItem('access_token'), member.characterId).subscribe(
      response => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: member.name + ' deleted successfully', type: 'success' },
          duration: 5000,
          panelClass: ['snackBarSuccess'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.dialogRef.close(member.characterId);
      },
      error => {
        this.snackbar.openFromComponent(DisplayingErrorComponent, {
          data: { message: error.error.message || error.error.error_description, type: 'alert' },
          duration: 5000,
          panelClass: ['snackBarAlert'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        if (Number(error.status) === 401 ) {
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  handleCancel() {
    this.dialogRef.close();
  }

}
