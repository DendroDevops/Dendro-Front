import {Injectable} from "@angular/core";


@Injectable()

export class BackButtonUrlService {

  constructor() {
  }

  setId(value: string): void {
    sessionStorage.setItem('id', value);
  }

  get id(): number {
    return parseInt(sessionStorage.getItem('id'));
  }

}
