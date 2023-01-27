import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class FilterTableService {
  private filterSource$ = new BehaviorSubject<String>('')

  constructor() {
  }

  getProfileSourceObs(): Observable<String> {
    return this.filterSource$.asObservable()
  }

  updateFilter(filter: string) {
    this.filterSource$.next(filter);
  }

}
