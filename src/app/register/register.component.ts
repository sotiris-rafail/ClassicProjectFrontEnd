import { OAuth2Token } from './../tokens';
import { MemberService } from './../homePage/member/userService/member.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as globals from '../utils/globals';
import { PasswordValidator } from '../utils/PasswordValidator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DisplayingErrorComponent } from '../displaying-error/displaying-error.component';



@Component({
  selector: 'register',
  templateUrl: './register.template.html',
  styleUrls: ['./register.style.css'],
  providers : [MemberService, DisplayingErrorComponent]
})
export class RegisterComponent implements OnInit {

  constructor(private registerUserService: MemberService, private router: Router, private snackBar: MatSnackBar) { }

  token: OAuth2Token;
  enterEmail = globals.enterEmail;
  emptyFieldError = globals.emptyFieldError;
  onlyNumberError = globals.onlyNumberError;
  noLessCharacters = globals.noLessCharacters;
  wrongPassword = globals.wrongPassword;
  rePassword = globals.rePassword;
  registerResponse: any;

  userNameControl = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(globals.EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', [
      Validators.required, Validators.minLength(8),
      PasswordValidator.passwordValidation('')
    ]);

    repasswordFormControl = new FormControl('', [
      Validators.required, Validators.minLength(8),
      PasswordValidator.passwordValidation(this.passwordFormControl.value as string)]);



  registerGroup = new FormGroup({
    userNameControl : this.userNameControl,
    passwordFormControl : this.passwordFormControl,
    repasswordFormControl : this.repasswordFormControl
  });

  ngOnInit() {

  }

  register() {
    const user = {
      'email' : this.registerGroup.getRawValue().userNameControl,
      'password' : this.registerGroup.getRawValue().passwordFormControl,
      'typeOfUser' : 1
    };
    this.registerUserService.registeUserService(user).subscribe(response => {
      this.registerUserService.loginUserService(user.email, user.password).subscribe(loginResponse => {
        this.token = new OAuth2Token(loginResponse as OAuth2Token);
        this.token.setTokenToStorage();
        this.registerResponse = response;
      });
      window.setTimeout(() => {
        this.router.navigateByUrl(response);
      }, 1000);
    }, error  => {
      const errorMEssage = JSON.parse(error.error);
      this.snackBar.openFromComponent(DisplayingErrorComponent,
        {
            duration: 5000,
            panelClass: 'snackBarError',
            data: { message: errorMEssage.message , type: 'error' },
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    });
  }
}
