import {Injectable} from '@angular/core';


const EMAILREGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const TELREGEX = new RegExp(/^0[1-9]([-. ]?[0-9]{2}){4}$/);
const DATEREGEX = new RegExp(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/);
export const PWDREGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
export const ZIPCODEREGEX = new RegExp(/^[0-9]{5,5}$/);

// NUM FRANCE (0033) ou (06)
const TELFRANCE = new RegExp(/^((\+)33|0)[1-9](\d{2}){4}$/);

/****
 * PASSWORD MUST CONTAIN 1 DIGIT, LOWER, UPPERCASE, MINIMUM 8 CHARACTERS
 */

@Injectable()

export class ControlService {

  constructor() {
  }

  // CONTROL EMAIL
  isEmail(email: string) {
    return EMAILREGEX.test(email);
  }

  // CONTROL REQUIRRED STRING
  isEmpty(chaine: any) {
    return !chaine;
  }

  // CONTROL NUMBER PHONE FRANCE
  isTelephone(tel: string) {
    return !TELFRANCE.test(tel) ? false : true;
  }

  filterFloat(value) {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number(value);
    return NaN;
  }
}
