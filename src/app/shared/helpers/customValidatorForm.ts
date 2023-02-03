import {AbstractControl, ValidatorFn} from '@angular/forms';
import {luhnCheck} from "./lunh.helper";
import {validateCardCVC, validateCardExpiry} from "./card.helper";

export const VALID_PATTERN_FLOAT = /^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/;

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let passwordConfirm = AC.get('passwordConfirm').value; // to get value in input tag

    if (password != passwordConfirm) {
      AC.get('passwordConfirm').setErrors({MatchPassword: true})
    } else {
      return null
    }
  }
}

export function luhnValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = luhnCheck(control.value);
    return isValid ? null : {'luhnCheck': isValid};
  };
}

export function validateCardExp(): ValidatorFn {
  return (control: AbstractControl) => {
    let controlValue = control.value.split("/");
    let isValid = false;
    if (controlValue.length > 1) {
      const month = controlValue[0].replace(/^\s+|\s+$/g, '');
      const year = controlValue[1].replace(/^\s+|\s+$/g, '');
      isValid = validateCardExpiry(month, year);
    }
    return !isValid ? {'ccExp': controlValue.value} : null
  }
}

export function validateCvC(): ValidatorFn {
  return (control: AbstractControl) => {
    let controlValue = control.value;
    if (!controlValue) return null;

    let isValid = validateCardCVC(control.value);
    return !isValid ? {'ccCvc': controlValue.value} : null;
  }
}
