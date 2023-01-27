import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { CustomTableWorkComponent } from "./components/custom-table-work/custom-table-work.component";
import { DetailWorkComponent } from "./components/detail-work/detail-work.component";
import { TableDataComponent } from "./components/table-data/table-data.component";
import { TotalPageComponent } from "./components/total-page/total-page.component";
import { ColorDirective } from "./shared/directives/color.directive";

@NgModule({
  declarations: [
    TableDataComponent,
    CustomTableWorkComponent,
    DetailWorkComponent,
    ColorDirective,
    TotalPageComponent,
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: "btn btn-lg btn-success",
      cancelButtonClass: "btn btn-lg btn-default",
    }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [TableDataComponent, CustomTableWorkComponent, TotalPageComponent],
  entryComponents: [DetailWorkComponent],
})
export class CustomTableModule {}
