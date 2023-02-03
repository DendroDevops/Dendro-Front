import {Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomDateApaterService extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  constructor() {
    super()
  }

  fromModel(value: string): NgbDateStruct {
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

  toModel(date: NgbDateStruct): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}
