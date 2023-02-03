import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlerteComponent} from "./components/alerte/alerte.component";
import {TravauxComponent} from "./components/travaux/travaux.component";
import {ExamenComponent} from "./components/examen/examen.component";
import {GestionTravauxService} from "./shared/service/gestion-travaux.service";
import {GestionTravauxRoutingModule} from "./gestion-travaux-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ExcelService} from "./shared/service/excel.service";
import {InventaireService} from "../inventaires/shared/service/inventaire.service";
import {InventaireSerializer} from "../inventaires/shared/serializer/inventaire.serializer";
import {UtilsModule} from "../../utils/utils.module";
import {CustomTableModule} from "../../custom-table/custom-table.module";
import {FormsComponentModule} from '../../forms-component/forms-component.module';
import {FilterTableModule} from '../../@Dendromap/components/filter-table/filter-table.module';

@NgModule({
  imports: [
    CommonModule,
    GestionTravauxRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-success',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    NgbModule.forRoot(),
    UtilsModule,
    CustomTableModule,
    FormsComponentModule,
    FilterTableModule
  ],
  declarations: [
    AlerteComponent,
    TravauxComponent,
    ExamenComponent
  ],
  providers: [
    GestionTravauxService,
    ExcelService,
    InventaireService,
    InventaireSerializer
  ]
})
export class GestionTravauxModule {
}
