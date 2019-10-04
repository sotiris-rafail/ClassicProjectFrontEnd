import { User } from './../admin-dash-board/admin-dash-board.component';
import { MemberService } from './../homePage/member/userService/member.service';
import { MatDialogRef, MatHorizontalStepper } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css'],
  providers: [MemberService]
})
export class RecoveryPasswordComponent {

  @ViewChild('stepper') stepper : MatHorizontalStepper;
  isLinear = true;
  email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  mainChar : FormControl = new FormControl('', [Validators.required]);
  password : FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  firstFormGroup: FormGroup = new FormGroup({
    email : this.email,
    mainChar : this.mainChar
  });
  secondFormGroup: FormGroup = new FormGroup({
    password : this.password
  });;
  notFoundMEssage = '';
  constructor(private dialogRef : MatDialogRef<RecoveryPasswordComponent>, private memberService : MemberService) { }

  verification() {
    this.notFoundMEssage = '';
    this.memberService.verifyUser(this.firstFormGroup.getRawValue().email, this.firstFormGroup.getRawValue().mainChar).subscribe(
      response => {
        if (response) {
          this.stepper.next();
        }
      }, error => {
        this.notFoundMEssage = this.firstFormGroup.getRawValue().email + " does not exist or " + this.firstFormGroup.getRawValue().mainChar + " is not his main Char";
      });
  }

  updatePassword(){
    const params : string[] = [this.firstFormGroup.getRawValue().email, this.secondFormGroup.getRawValue().password]
    this.memberService.updatePassword(params).subscribe(
      response => {
        this.stepper.next();
      }, error => {
        console.log(error)
      });
  }
}
