import {NgModule} from '@angular/core';
import {FilterTableComponent} from './filter-table.component';
import {CommonModule} from '@angular/common';
import {FilterTableService} from "./service/filter-table.service";
import {PreviousUrlService} from "./service/previous-url.service";

@NgModule({
  declarations: [
    FilterTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterTableComponent
  ],
  providers: [
    FilterTableService,
    PreviousUrlService
  ]
})

export class FilterTableModule {

}
