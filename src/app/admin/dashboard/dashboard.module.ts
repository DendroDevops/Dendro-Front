import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateApaterService} from "../../shared/service/custom-date-apater.service";
import {CustomDateParserFormatterService} from "../../shared/service/custom-date-parser-formatter.service";
import {CustomDatepickerI18n, I18nService} from "../../shared/service/i18n.service";
import {HighchartsChartModule} from "highcharts-angular";
import {RouterModule} from "@angular/router";
import {InventaireService} from "../inventaires/shared/service/inventaire.service";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {PlantationService} from "../plantations/shared/service/plantation.service";
import {PlantationsSerializer} from "../plantations/shared/serializer/plantations.serializer";
import {InventaireSerializer} from "../inventaires/shared/serializer/inventaire.serializer";
import {GestionTravauxService} from "../gestion-travaux/shared/service/gestion-travaux.service";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HighchartsChartModule,
    RouterModule,
    NgbModule.forRoot(),
    HighchartsChartModule,
    NgxChartsModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomDateApaterService},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService},
    I18nService,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    InventaireService,
    PlantationService,
    PlantationsSerializer,
    InventaireSerializer,
    GestionTravauxService
  ]
})
export class DashboardModule {
}
