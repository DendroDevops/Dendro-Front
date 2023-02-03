import {Injectable} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class CustomDateParserFormatterService {
  readonly DELIMITER = '/';

  constructor() {
  }

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.formatDateToModel(date.day) + this.DELIMITER + this.formatDateToModel(date.month) + this.DELIMITER + date.year : '';
  }

  private formatDateToModel(d: any) {
    return (d < 10) ? '0' + d : d
  }
}
