import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventaireService} from "./shared/service/inventaire.service";
import {InventairesComponent} from "./pages/inventaires/inventaires.component";
import {GeoInventairesComponent} from "./pages/geo-inventaires/geo-inventaires.component";
import {AddEssenceComponent} from "./pages/add-essence/add-essence.component";
import {DetailArbreComponent} from "./pages/detail-arbre/detail-arbre.component";
import {DetailInventaireComponent} from "./pages/detail-inventaire/detail-inventaire.component";
import {ModifEssenceComponent} from "./pages/modif-essence/modif-essence.component";
import {ModifInventaireComponent} from "./pages/modif-inventaire/modif-inventaire.component";
import {PrintDetailInventaireComponent} from "./pages/print-detail-inventaire/print-detail-inventaire.component";
import {PrintInventaireComponent} from "./pages/print-inventaire/print-inventaire.component";
import {SaisieValideComponent} from "./pages/saisie-valide/saisie-valide.component";
import {DetailEssenceComponent} from "./pages/detail-essence/detail-essence.component";
import {FilterEssencePipe} from "./shared/pipes/filter-essence.pipe";
import {FilterAddressPipe} from "./shared/pipes/filter.pipe";
import {EssenceService} from "./shared/service/essence.service";

import {ArchwizardModule} from 'ng2-archwizard';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectModule} from "ng-select";
import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {ImageViewerModule} from "ng2-image-viewer";
import {NgxImageGalleryModule} from "ngx-image-gallery";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FileUploadModule} from "ng2-file-upload";
import {OrderModule} from "ngx-order-pipe";
import {InventairesRoutingModule} from "./inventaires-routing.module";
import {ExcelService} from "../gestion-travaux/shared/service/excel.service";
import {EcheanceDateService} from "./shared/service/echeance-date.service";
import {EspeceService} from "../config-inventaire/shared/service/espece.service";
import {EspeceSerializer} from "../config-inventaire/shared/serializer/espece.serializer";
import {ChampignonsSerializer} from "../config-inventaire/shared/serializer/champignons.serializer";
import {ChampignonsService} from "../config-inventaire/shared/service/champignons.service";
import {NuisibleService} from "../config-inventaire/shared/service/nuisible.service";
import {NuisibleSerializer} from "../config-inventaire/shared/serializer/nuisible.serializer";
import {InventaireSerializer} from "./shared/serializer/inventaire.serializer";
import {ArbreService} from "./shared/service/arbre.service";
import {ArbreSerializer} from "./shared/serializer/arbre.serializer";
import {EssenceSerializer} from './shared/serializer/essence.serializer';
import {InventoryConstService} from "./shared/service/inventory-const.service";
import {RouterModule} from "@angular/router";
import {BevaService} from "./shared/service/beva.service";
import {FormsComponentModule} from "../../forms-component/forms-component.module";
import {UtilsModule} from "../../utils/utils.module";
import {CustomTableModule} from "../../custom-table/custom-table.module";
import {InfoUserInventoryComponent} from "./components/info-user-inventory/info-user-inventory.component";
import {ButtonShowPageComponent} from "./components/button-show-page/button-show-page.component";
import {CardBodyInfosEpaysageComponent} from "./components/card-body-infos-epaysage/card-body-infos-epaysage.component";
import {FilterTableModule} from "../../@Dendromap/components/filter-table/filter-table.module";
import {MarkerTreeComponent} from "./components/marker-tree/marker-tree.component";
import {BackButtonUrlService} from "./shared/service/backButtonUrl.service";
import {AutoCompleteAddressComponent} from "./components/auto-complete-address/auto-complete-address.component";
import {AgmCoreModule} from "@agm/core";
import {AutocompleteService} from "./shared/service/autocomplete.service";
import {MapService} from "../../shared/service/map.service";
import {AgmJsMarkerClustererModule} from "@agm/js-marker-clusterer";
import { PrintInventairesComponent } from './pages/print-inventaires/print-inventaires.component';
import { PrintDetailsInventairesComponent } from './pages/print-details-inventaires/print-details-inventaires.component';


@NgModule({
  imports: [
    CommonModule,
    ArchwizardModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-success',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    ImageViewerModule,
    NgxImageGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtsQeeMq9e8CkZiTiUd-DsdIBrJaOek5A',
      libraries: ['places'],
    }),
    NgbModule.forRoot(),
    FileUploadModule,
    OrderModule,
    InventairesRoutingModule,
    FormsComponentModule,
    UtilsModule,
    CustomTableModule,
    FilterTableModule,
    AgmJsMarkerClustererModule
  ],
  declarations: [
    AddEssenceComponent,
    DetailArbreComponent,
    DetailEssenceComponent,
    InventairesComponent,
    GeoInventairesComponent,
    DetailInventaireComponent,
    ModifEssenceComponent,
    ModifInventaireComponent,
    PrintDetailInventaireComponent,
    PrintInventaireComponent,
    SaisieValideComponent,
    FilterEssencePipe,
    FilterAddressPipe,
    InfoUserInventoryComponent,
    ButtonShowPageComponent,
    CardBodyInfosEpaysageComponent,
    MarkerTreeComponent,
    AutoCompleteAddressComponent,
    PrintInventairesComponent,
    PrintDetailsInventairesComponent,
   
  ],
  providers: [
    InventaireService,
    EssenceService,
    ExcelService,
    EcheanceDateService,
    EspeceService,
    EspeceSerializer,
    ChampignonsSerializer,
    ChampignonsService,
    NuisibleService,
    NuisibleSerializer,
    InventaireSerializer,
    ArbreService,
    ArbreSerializer,
    EssenceSerializer,
    InventoryConstService,
    BevaService,
    BackButtonUrlService,
    AutocompleteService,
    MapService
  ]
})
export class InventairesModule {
}
