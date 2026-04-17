import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function comparisonValidator(compareField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const compareVal = control.parent?.get(compareField)?.value;

    if (control.value !== compareVal) {
      control.setErrors({ comparison: false });
      return { comparison: false };
    } else {
      // Clear error if they match
      control.parent?.get(compareField)?.setErrors(null);
      return null;
    }
  };

}
