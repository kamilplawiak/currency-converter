import { AbstractControl } from "@angular/forms";

export function checkCurrencyValue(control: AbstractControl) : { [errorCode: string]: boolean } {
    if(isNaN(+control.value))
        return {
            'invalidCurrencyValue': true
        }
}