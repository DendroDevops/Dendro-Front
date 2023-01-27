import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AutocompleteService, GoogleResult} from "../../shared/service/autocomplete.service";
import {Observable, OperatorFunction} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";

@Component({
  selector: 'app-auto-complete-address',
  templateUrl: './auto-complete-address.component.html',
  styleUrls: ['./auto-complete-address.component.scss']
})
export class AutoCompleteAddressComponent implements OnInit {
  @Input() addressForm: FormGroup;
  @Input() formName: string;

  result: GoogleResult[];

  constructor(private autoCompleteService: AutocompleteService) {
  }

  ngOnInit(): void {
    this.getPlaces();
  }

  formatter = (state: GoogleResult) => state.description;

  getPlaces(): void {
    this.autoCompleteService.currentData
      .pipe(
        map((response: GoogleResult[]) => response.map((elt: GoogleResult) => {
          return {
            description: elt.description,
            place_id: elt.place_id
          }
        }))
      )
      .subscribe((response: GoogleResult[]) => {
        this.result = response;
      })
  }

  onSearch(): void {
    if (!this.addressForm.get(this.formName).value) {
      return;
    }
    // Get places predictions
    this.autoCompleteService.getPlacesPrediction(this.addressForm.get(this.formName).value)
  }

  search: OperatorFunction<string, readonly GoogleResult[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length > 2),
      map(term => this.result.filter((state: GoogleResult) => new RegExp(term, 'mi').test(state.description)).slice(0, 10))
    )

}
