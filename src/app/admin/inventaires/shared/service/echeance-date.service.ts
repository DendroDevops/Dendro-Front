import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable()
export class EcheanceDateService {

  constructor() {
  }

  static customDateTravaux(date: string): string {
    let DATE_NOW = moment();
    if (!date) {
      return;
    }
    if (date == 'immediat') {
      DATE_NOW.add(1, 'month');
    } else if (date == '1an') {
      DATE_NOW.add(1, 'year');
    } else if (date == '2ans') {
      DATE_NOW.add(2, 'year');
    } else if (date == '3ans') {
      DATE_NOW.add(3, 'year');
    } else if (date == '5ans') {
      DATE_NOW.add(5, 'year');
    }
    return DATE_NOW.format('DD/MM/YYYY')
  }

  static formatToServer(date: string): string {
    return moment(date, "DD/MM/YYYY").toISOString();
  }

  static formatDateToModel(date: Date): string {
    return date ? moment(date).format('DD/MM/YYYY') : null;
  }

}
