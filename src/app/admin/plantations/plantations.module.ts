import { AgmCoreModule } from "@agm/core";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { FilterTableModule } from "../../@Dendromap/components/filter-table/filter-table.module";
import { CustomTableModule } from "../../custom-table/custom-table.module";
import { FormsComponentModule } from "../../forms-component/forms-component.module";
import { MapService } from "../../shared/service/map.service";
import { UtilsModule } from "../../utils/utils.module";
import { EspeceSerializer } from "../config-inventaire/shared/serializer/espece.serializer";
import { EspeceService } from "../config-inventaire/shared/service/espece.service";
import { ExcelService } from "../gestion-travaux/shared/service/excel.service";
import { ArbreSerializer } from "../inventaires/shared/serializer/arbre.serializer";
import { EssenceSerializer } from "../inventaires/shared/serializer/essence.serializer";
import { InventaireSerializer } from "../inventaires/shared/serializer/inventaire.serializer";
import { ArbreService } from "../inventaires/shared/service/arbre.service";
import { BackButtonUrlService } from "../inventaires/shared/service/backButtonUrl.service";
import { EssenceService } from "../inventaires/shared/service/essence.service";
import { InventaireService } from "../inventaires/shared/service/inventaire.service";
import { PlantationsComponent } from "./components/plantations/plantations.component";
import { PlantationsRoutingModule } from "./plantations-routing.module";
import { FilterPlantAdrPipe } from "./shared/pipes/filter-plant-adr.pipe";
import { FilterPlantNamePipe } from "./shared/pipes/filter-plant-name.pipe";
import { PlantationsSerializer } from "./shared/serializer/plantations.serializer";
import { PlantationService } from "./shared/service/plantation.service";

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    PlantationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-success',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtsQeeMq9e8CkZiTiUd-DsdIBrJaOek5A'
    }),
    FormsComponentModule,
    UtilsModule,
    CustomTableModule,
    FilterTableModule
  ],
  declarations: [
    PlantationsComponent,
    FilterPlantAdrPipe,
    FilterPlantNamePipe,
  ],
  providers: [
    PlantationService,
    InventaireService,
    EssenceService,
    EssenceSerializer,
    BackButtonUrlService,
    PlantationsSerializer,
    ExcelService,
    EspeceService,
    EspeceSerializer,
    MapService,
    InventaireSerializer,
    ArbreService,
    ArbreSerializer
  ]
})
export class PlantationsModule {
}
