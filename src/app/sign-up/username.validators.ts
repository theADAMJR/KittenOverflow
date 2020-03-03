import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators
{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null
    {
        const hasSpace = (control.value as string).indexOf(" ") >= 0;
        return (hasSpace) ? { cannotContainSpace: true } : null;
    }

    static async shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors> | null
    {
        return new Promise(resolve =>
        {
            setTimeout(() => 
            {
                const validation = (control.value === "steve") ? { shouldBeUnique: true } : null;
                resolve(validation);
            }, 500);
        });
    }
}