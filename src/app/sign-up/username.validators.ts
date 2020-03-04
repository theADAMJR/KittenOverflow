import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class UsernameValidators {
    static takenUsernames: string[] = [];

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        const hasSpace = (control.value as string).indexOf(' ') >= 0;
        return (hasSpace) ? { cannotContainSpace: true } : null;
    }

    static async shouldBeUnique(control: AbstractControl): Promise<ValidationErrors> | null {
        return new Promise(resolve => {
            setTimeout(() => {
                const isTaken = UsernameValidators.takenUsernames.includes(control.value);
                const validation = isTaken ? { shouldBeUnique: true } : null;
                console.log(validation);

                resolve(validation);
            }, 500);
        });
    }
}
