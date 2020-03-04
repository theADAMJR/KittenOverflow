import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class PasswordValidators {
    static passwordsShouldMatch(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;
        return (password !== confirmPassword) ? { passwordsDoNotMatch: true } : null;
    }
}
