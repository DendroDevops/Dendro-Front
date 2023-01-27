import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigChampignonsComponent} from "./pages/config-champignons/config-champignons.component";
import {ConfigEspeceComponent} from "./pages/config-espece/config-espece.component";
import {DetailChampignonsComponent} from "./pages/detail-champignons/detail-champignons.component";
import {DetailEspeceComponent} from "./pages/detail-espece/detail-espece.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfigInventaireRoutingModule} from "./config-inventaire-routing.module";
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {EspeceService} from "./shared/service/espece.service";
import {ChampignonsService} from "./shared/service/champignons.service";
import {EspeceSerializer} from "./shared/serializer/espece.serializer";
import {ChampignonsSerializer} from "./shared/serializer/champignons.serializer";
import {UtilsModule} from "../../utils/utils.module";
import {CustomTableModule} from "../../custom-table/custom-table.module";
import {FormsComponentModule} from "../../forms-component/forms-component.module";
import {InventaireService} from "../inventaires/shared/service/inventaire.service";
import {InventaireSerializer} from "../inventaires/shared/serializer/inventaire.serializer";
import {AddChampignonsComponent} from "./components/add-champignons/add-champignons.component";
import {ListChampignonsComponent} from "./components/list-champignons/list-champignons.component";
import {AddEspeceComponent} from "./components/add-espece/add-espece.component";
import {ListEspeceComponent} from "./components/list-espece/list-espece.component";
import {FilterTableModule} from "../../@Dendromap/components/filter-table/filter-table.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgbModule.forRoot(),
    ConfigInventaireRoutingModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-success',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    UtilsModule,
    CustomTableModule,
    FormsComponentModule,
    FilterTableModule
  ],
  declarations: [
    ConfigChampignonsComponent,
    ConfigEspeceComponent,
    DetailChampignonsComponent,
    DetailEspeceComponent,
    AddChampignonsComponent,
    ListChampignonsComponent,
    AddEspeceComponent,
    ListEspeceComponent
  ],
  providers: [
    EspeceService,
    ChampignonsService,
    EspeceSerializer,
    ChampignonsSerializer,
    InventaireService,
    InventaireSerializer
  ]
})
export class ConfigInventaireModule {
}
