import { Component, OnInit, Inject } from '@angular/core';
import { RegisterCharacterService } from '../addition-character-panel/registerCharacterService/registerCharacterService';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';

@Component({
  selector: 'app-delete-panel',
  templateUrl: './delete-panel.component.html',
  styleUrls: ['./delete-panel.component.css'],
  providers : [RegisterCharacterService, DisplayingErrorComponent]
})
export class DeletePanelComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePanelComponent>,  @Inject(MAT_DIALOG_DATA) public data : any, private charService : RegisterCharacterService, private snackBar : MatSnackBar) {
   }

  ngOnInit() {
  }

  handleYes(characterId : number) {
    this.charService.deleteCharacter(sessionStorage.getItem("access_token"), characterId).subscribe(
      response => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarSuccess',
            data: { message: this.data.character.name +" has been deleted sucessfully", type: 'success' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        window.location.reload();
      },
      error => {
        this.snackBar.openFromComponent(DisplayingErrorComponent,
          {
            duration: 5000,
            panelClass: 'snackBarError',
            data: { message: error.error.message , type: 'error' },
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
      }
    )
  }

  handleCancel(){
    this.dialogRef.close();
  }
}
