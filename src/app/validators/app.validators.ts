import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { phoneNumberFormats } from '@models/api.routes';
import { hasLowerCase, hasNumber, hasSymbol, hasUpperCase } from '@services/utilities';

export function comparisonValidator(compareField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const compareVal = control.parent?.get(compareField)?.value;

    if (control.value !== compareVal) {
      control.setErrors({ comparison: false });
      return { comparison: false };
    } else {
      // Clear error if they match
      return null;
    }
  };

}

export function moneyValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        if (control.value == null)
            return { isValid: false }
        
        let mn = (control.value).replaceAll(',', '').replaceAll('.', '')
        
        return isNaN(+mn)? { isValid: false } : null
    }
}

export function phoneNumberValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if(isNaN(+value)) return { isValid: false }

        let l = value?.length
        let isNigerianFormat = phoneNumberFormats.indexOf(value.substring(0, 4)) > -1

        return l != 11 || isNigerianFormat == false? { isValid: false }: null;
    }
}

export function emailValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        const isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value);

        return !isValid ? { isValid:false }: null;
    }
}

export function urlValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        const isValid = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(value);

        return !isValid ? { isValid:false }: null;
    }
}

export function passwordValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const hasSpecialChar = /[!@#$%^&*()\-_=+{}[\]|\\;:'",.<>/?]/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

        return !passwordValid ? { isValid:false }: null;
    }
}

export function numberValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        return isNaN(+control.value)? { number: false } : null
    }
}

export function hasNumberValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        return !hasNumber(control.value) ? { hasNumber:false }: null;
    }
}

export function hasUpperCaseValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        return !hasUpperCase(control.value) ? { hasUpperCase:false }: null;
    }
}

export function hasLowerCaseValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        return !hasLowerCase(control.value) ? { hasLowerCase:false }: null;
    }
}

export function hasSpecialCharValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        return !hasSymbol(control.value) ? { hasSymbol:false }: null;
    }
}

export function dobValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const secondsInAYear = 60 * 60 * 24 * 365

        const date = new Date(control.value).getTime()
        const today = new Date().getTime()

        let diffInSecs = Math.abs(today - date) / 1000;
        let toYears = diffInSecs / secondsInAYear

        return toYears < 18 ? { isValid:false }: null;
    }
}

export function noFutureDateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const date = new Date(control.value).getTime()
        const today = new Date().getTime()

        return date > today ? { isValid:false }: null;
    }
}
