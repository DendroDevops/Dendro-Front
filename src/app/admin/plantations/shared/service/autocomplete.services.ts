import {EventEmitter, Injectable, Output} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {MapService} from "../../../../shared/service/map.service";

declare var google: any

export type GoogleResult = {
  description: string;
  place_id: string;
}

@Injectable()

export class AutocompleteServices {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  public data: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public autoCompleteServices: any
  public currentData = this.data.asObservable();

  geocoder: any;

  constructor(private mapService: MapService) {
    this.loadAutoCompleteService();
  }

  loadAutoCompleteService(): void {
    this.mapService.loadMapService().then(() => {
      this.autoCompleteServices = new google.maps.places.AutocompleteService();
    });
  }

  getPlacesPrediction(filter: string): Observable<any> {
    return this.autoCompleteServices.getPlacePredictions({
      input: filter
    }, (data: GoogleResult[]) => {
      if (data) {
        this.data.next(data);
      }
    });
    
  }
 
}
