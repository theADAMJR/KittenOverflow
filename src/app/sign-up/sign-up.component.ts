import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsernameValidators } from './username.validators';
import { UserAuthService, Credentials, User } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{
    constructor(private router: Router, private users: UsersService, private auth: UserAuthService) {}

    async ngOnInit() {
        await this.updateTakenUsernames();
    }

    form = new FormGroup({
        username: new FormControl("", 
        [ 
            Validators.required, 
            Validators.minLength(3), 
            UsernameValidators.cannotContainSpace
        ], UsernameValidators.shouldBeUnique),        
        password: new FormControl("", Validators.required)
    });

    get username() { return this.form.get("username") }
    get password() { return this.form.get("password") }

    async signUp(user: Credentials) {
        await this.auth.signUp(user);
        await this.auth.login(user);
        await this.router.navigate(["/"]);
    }

    async updateTakenUsernames() {
        const users = await this.users.get();
        const usernames: string[] = [];
        for (const user of users) {
            usernames.push(user.username);
        }
        UsernameValidators.takenUsernames = usernames;
    }
}