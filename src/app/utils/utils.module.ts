import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class UtilsModule {
}
