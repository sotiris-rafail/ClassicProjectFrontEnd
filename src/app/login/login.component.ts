import { RecoveryPasswordComponent } from './../recovery-password/recovery-password.component';
import { DisplayingErrorComponent } from 'src/app/displaying-error/displaying-error.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MemberService } from './../homePage/member/userService/member.service';
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as globals from "../utils/globals"
import { OAuth2Token } from '../tokens';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.css'],
    providers: [MemberService, DisplayingErrorComponent]
})
export class LoginComponent {

    constructor(private registerUserService: MemberService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

    private token: OAuth2Token;
    enterEmail = globals.enterEmail;
    emptyFieldError = globals.emptyFieldError;
    wrongPassword = globals.wrongPassword;

    userNameControl = new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(globals.EMAIL_REGEX)]);

    passwordControl = new FormControl("", [
        Validators.required]);


    logInGroup = new FormGroup({
        userNameControl: this.userNameControl,
        passwordControl: this.passwordControl
    })

    login() {
        this.registerUserService.loginUserService(this.logInGroup.getRawValue().userNameControl, this.logInGroup.getRawValue().passwordControl)
            .subscribe(loginResponse => {
                this.token = new OAuth2Token(loginResponse as OAuth2Token);
                this.token.setTokenToStorage();
                this.router.navigateByUrl("/user/" + this.token.getUser)
            }, loginError => {
                this.snackBar.openFromComponent(DisplayingErrorComponent,
                    {
                        duration: 5000,
                        panelClass: 'snackBarError',
                        data: { message: loginError.error.error_description, type: 'error' },
                        horizontalPosition: 'center',
                        verticalPosition: 'top'
                    });
            })
    }

    changePassword() {
       const dialogRef = this.dialog.open(RecoveryPasswordComponent);
    }
}