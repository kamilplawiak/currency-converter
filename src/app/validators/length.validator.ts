import { AbstractControl } from "@angular/forms";

export function minLengthValidator(formControl : AbstractControl) : { [error: string]: boolean } {
    return {
        error: true
    }
}