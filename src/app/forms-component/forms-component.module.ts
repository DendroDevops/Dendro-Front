import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspeceFormComponent} from "./components/espece-form/espece-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SelectModule} from "ng-select";
import {TextInputFormComponent} from "./components/text-input-form/text-input-form.component";
import {DateInputFormComponent} from "./components/date-input-form/date-input-form.component";
import {SelectInputFormComponent} from "./components/select-input-form/select-input-form.component";
import {BevaComponent} from "./components/beva/beva.component";
import {TextareaInputFormComponent} from "./components/textarea-input-form/textarea-input-form.component";
import {ButtonComponent} from "./components/button/button.component";
import {ExportButtonComponent} from './components/export-button/export-button.component';
import {ButtonDeleteComponent} from './components/button-delete/button-delete.component';
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {ButtonFloatComponent} from "./components/button-float/button-float.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    SelectModule,
    SweetAlert2Module
  ],
  declarations: [
    EspeceFormComponent,
    TextInputFormComponent,
    DateInputFormComponent,
    SelectInputFormComponent,
    BevaComponent,
    TextareaInputFormComponent,
    ButtonComponent,
    ExportButtonComponent,
    ButtonDeleteComponent,
    ButtonFloatComponent
  ],
  exports: [
    EspeceFormComponent,
    TextInputFormComponent,
    DateInputFormComponent,
    SelectInputFormComponent,
    BevaComponent,
    TextareaInputFormComponent,
    ButtonComponent,
    ExportButtonComponent,
    ButtonDeleteComponent,
    ButtonFloatComponent
  ]
})
export class FormsComponentModule {
}
