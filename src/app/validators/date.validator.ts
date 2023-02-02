import { AbstractControl } from "@angular/forms";

export function dateValidator(formControl: AbstractControl) : { [error: string]: boolean } {
    if(!formControl.value)
        return {
            invalidDate: true
        }
}