import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutocompleteServices ,GoogleResult} from '../service/autocomplete.services';
import {Observable, OperatorFunction} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
@Component({
  selector: 'app-auto-complete-adresses',
  templateUrl: './auto-complete-adresses.component.html',
  styleUrls: ['./auto-complete-adresses.component.scss']
})
export class AutoCompleteAdressesComponent implements OnInit {

  @Input() addressForm: FormGroup;
  @Input() formName: string;
  @Output() selectedCountry = new EventEmitter<FormGroup>();
 
  result: GoogleResult[];

  constructor(private autoCompleteServices: AutocompleteServices) {
  }

  ngOnInit(): void {
    this.getPlaces();
  }

  formatter = (state: GoogleResult) => state.description;

  getPlaces(): void {
    this.autoCompleteServices.currentData
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
    this.autoCompleteServices.getPlacesPrediction(this.addressForm.get(this.formName).value)
  }

  search: OperatorFunction<string, readonly GoogleResult[]> = (text$: Observable<string>) =>
  
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length > 2),
      map(term =>

         this.result.filter((state: GoogleResult) => new RegExp(term, 'mi').test(state.description)
         ).slice(0, 10)
         )

    )
 
      onSelectCountry(country:any) {
        if(country.place_id!=null){
          console.log("country seleted");
          console.log(country);
          this.selectedCountry.emit(country);
        }

      
      }
      
}
