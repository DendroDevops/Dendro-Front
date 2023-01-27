import {CardBrandEnum} from "../modele/card.model";

const digitMask = (numDigits: number) => Array(numDigits).fill(/\d/);

export const getValidationConfigFromCardNo = (data: string): CardValidation => cards.find(card => {
  const patterns = card.patterns.map(
    pattern => new RegExp(`^${pattern}`, 'g')
  );
  const matchResult = patterns
    .map(pattern => data.match(pattern))
    .filter(result => result);

  return !!matchResult.length;
}) || null;

const defaultFormat = /(\d{1,4})/g;

export interface CardValidation {
  type: CardBrandEnum;
  patterns: number[];
  mask: any;
  format: RegExp;
  length: number[];
  cvvLength: number[];
  luhn: boolean;
}

const defaultMask19 = [
  ...digitMask(4),
  ' ',
  ...digitMask(4),
  ' ',
  ...digitMask(4),
  ' ',
  ...digitMask(4),
  ' ',
  ...digitMask(3)
];

const defaultMask16 = [
  ...digitMask(4),
  ' ',
  ...digitMask(4),
  ' ',
  ...digitMask(4),
  ' ',
  ...digitMask(4)
];

const dinersClubMask = [
  ...digitMask(4),
  ' ',
  ...digitMask(6),
  ' ',
  ...digitMask(4)
];

const amexMask = [
  ...digitMask(4),
  ' ',
  ...digitMask(6),
  ' ',
  ...digitMask(5)
];

export const cards = Object.freeze([
  {
    type: CardBrandEnum.VISA,
    patterns: [4],
    format: defaultFormat,
    mask: defaultMask19,
    length: [13, 16, 19],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.MAESTRO,
    patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
    format: defaultFormat,
    mask: defaultMask19,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.FORBRUGSFORENINGEN,
    patterns: [600],
    format: defaultFormat,
    mask: defaultMask16,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.DANKORT,
    patterns: [5019],
    format: defaultFormat,
    mask: defaultMask16,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.MASTERCARD,
    patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
    format: defaultFormat,
    mask: defaultMask16,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.AMERICANEXPRESS,
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    mask: amexMask,
    length: [15],
    cvvLength: [3, 4],
    luhn: true
  },
  {
    type: CardBrandEnum.DINERSCLUB,
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    mask: dinersClubMask,
    length: [14],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.DISCOVER,
    patterns: [60, 64, 65, 622],
    format: defaultFormat,
    mask: defaultMask16,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: CardBrandEnum.UNIONPAY,
    patterns: [62, 88],
    format: defaultFormat,
    mask: defaultMask19,
    length: [16, 17, 18, 19],
    cvvLength: [3],
    luhn: false
  },
  {
    type: CardBrandEnum.JCB,
    patterns: [35],
    format: defaultFormat,
    mask: defaultMask19,
    length: [16, 19],
    cvvLength: [3],
    luhn: true
  }
]);

const indexOf = [].indexOf || function (item) {
  for (let i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) return i;
  }
  return -1;
};

export function validateCardExpiry(month, year) {
  let currentTime, expiry, prefix, ref, ref1;
  if (typeof month === 'object' && 'month' in month) {
    ref = month;
    month = ref.month;
    year = ref.year;
  } else if (typeof month === 'string' && indexOf.call(month, '/') >= 0) {
    ref1 = cardExpiryVal(month);
    month = ref1.month;
    year = ref1.year;
  }
  if (!(month && year)) {
    return false;
  }
  month = month.trim();
  year = year.trim();
  if (!/^\d+$/.test(month)) {
    return false;
  }
  if (!/^\d+$/.test(year)) {
    return false;
  }
  month = parseInt(month, 10);
  if (!(month && month <= 12)) {
    return false;
  }
  if (year.length === 2) {
    prefix = (new Date).getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = prefix + year;
  }
  expiry = new Date(year, month);
  currentTime = new Date;
  expiry.setMonth(expiry.getMonth() - 1);
  expiry.setMonth(expiry.getMonth() + 1, 1);
  return expiry > currentTime;
}

let cardExpiryVal = (value) => {
  let month, prefix, ref, year;
  value = value.replace(/\s/g, '');
  ref = value.split('/', 2);
  month = ref[0];
  year = ref[1];
  if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
    prefix = (new Date).getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = prefix + year;
  }
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  return {
    month: month,
    year: year
  };
}

export function validateCardCVC(cvc): boolean {
  cvc = cvc.trim();
  if (!/^\d+$/.test(cvc)) return false;
  return cvc.length >= 3 && cvc.length <= 4;
}


