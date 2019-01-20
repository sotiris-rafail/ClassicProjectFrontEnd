import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {

    static passwordValidation = (repassword : string) =>{ 
        return (control : AbstractControl) : {[key : string ] : any }=> {
            let password = control.value
            if(control == control.root.get("passwordFormControl")) {
                repassword = control.root.get("repasswordFormControl") == null ? "" : control.root.get("repasswordFormControl").value;
            } else {
                repassword = control.root.get("passwordFormControl") == null ? "" : control.root.get("passwordFormControl").value;
            }
            if(repassword && password !== repassword){
                return { PasswordValidator : false };
            } 
            if (repassword && password === repassword) {
                if(control == control.root.get("passwordFormControl")) {
                    control = control.root.get("repasswordFormControl") == null ? null : control.root.get("repasswordFormControl");
                } else {
                    control = control.root.get("passwordFormControl") == null ? null : control.root.get("passwordFormControl");
                }
                if(control.errors){
                    delete control.errors['PasswordValidator']
                    if (!Object.keys(control.errors).length) { 
                        control.setErrors(null);
                    }
                }
            }
            return null;
        }
      }
}