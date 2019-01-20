import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as globals from "../utils/globals"
import { PasswordValidator } from '../utils/PasswordValidator';

@Component({
  selector: 'register',
  templateUrl: './register.template.html',
  styleUrls: ['./register.style.css']
})
export class RegisterComponent implements OnInit {


  enterEmail = globals.enterEmail;
  emptyFieldError = globals.emptyFieldError;
  onlyNumberError = globals.onlyNumberError;
  noLessCharacters = globals.noLessCharacters;
  wrongPassword = globals.wrongPassword;
  rePassword = globals.rePassword;

  constructor() { }

  ngOnInit() {
  }

  userNameControl = new FormControl("", [
    Validators.required,
    Validators.email,
    Validators.pattern(globals.EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
      Validators.required, Validators.minLength(8),
      PasswordValidator.passwordValidation("")
    ]);
  
    repasswordFormControl = new FormControl('', [
      Validators.required, Validators.minLength(8),
      PasswordValidator.passwordValidation(this.passwordFormControl.value as string)]);
  


  registerGroup = new FormGroup({
    userNameControl : this.userNameControl,
    passwordFormControl : this.passwordFormControl,
    repasswordFormControl : this.repasswordFormControl
  })

  register(){
    console.log(this.registerGroup.getRawValue())
  }

}
