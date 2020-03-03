import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsernameValidators } from './username.validators';
import { UserAuthService, Credentials } from '../services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent
{
    constructor(private router: Router, private auth: UserAuthService) {}

    form = new FormGroup(
    {
        username: new FormControl("", 
        [ 
            Validators.required, 
            Validators.minLength(3), 
            UsernameValidators.cannotContainSpace,
            UsernameValidators.shouldBeUnique
        ]),
        password: new FormControl("", Validators.required)
    });

    get username() { return this.form.get("username") }
    get password() { return this.form.get("password") }

    async signUp(user: Credentials)
    {
        console.log(user);        
        
        try
        {
            await this.auth.signUp(user);        
            await this.auth.login(user);
            this.router.navigate(["/"]);
        }
        catch { this.form.setErrors({ invalidLogin: true }) }
    }
}