import { Component, OnInit, Inject } from '@angular/core';
import { RegisterCharacterService } from '../addition-character-panel/registerCharacterService/registerCharacterService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-panel',
  templateUrl: './delete-panel.component.html',
  styleUrls: ['./delete-panel.component.css'],
  providers : [RegisterCharacterService]
})
export class DeletePanelComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePanelComponent>,  @Inject(MAT_DIALOG_DATA) public data : any, private charService : RegisterCharacterService) {
   }

  ngOnInit() {
  }

  handleYes(characterId : number) {
    this.charService.deleteCharacter(sessionStorage.getItem("access_token"), characterId).subscribe(
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
