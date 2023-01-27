import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {MapService} from "../../../../shared/service/map.service";

declare var google: any

export type GoogleResult = {
  description: string;
  place_id: string;
}

@Injectable()

export class AutocompleteService {

  public data: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public autoCompleteService: any
  public currentData = this.data.asObservable();

  geocoder: any;

  constructor(private mapService: MapService) {
    this.loadAutoCompleteService();
  }

  loadAutoCompleteService(): void {
    this.mapService.loadMapService().then(() => {
      this.autoCompleteService = new google.maps.places.AutocompleteService();
    });
  }

  getPlacesPrediction(filter: string): Observable<any> {
    return this.autoCompleteService.getPlacePredictions({
      input: filter,
      componentRestrictions: {country: 'fr'}
    }, (data: GoogleResult[]) => {
      if (data) {
        this.data.next(data);
      }
    });
  }

}
