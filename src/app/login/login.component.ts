import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as globals from "../utils/globals"

@Component({
    selector: 'login',
    templateUrl: './login.template.html',
    styleUrls: ['./login.style.css'],
    providers: []
})
export class LoginComponent{


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
        userNameControl : this.userNameControl,
        passwordControl : this.passwordControl
    })

    login(){
        this.logInGroup.getRawValue().userNameControl;
        this.logInGroup.getRawValue().passwordControl;
    }
}