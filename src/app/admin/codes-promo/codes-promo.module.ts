import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { CustomTableModule } from "../../custom-table/custom-table.module";
import { FormsComponentModule } from "../../forms-component/forms-component.module";

import { UtilsModule } from "../../utils/utils.module";
import { CodesPromoRoutingModule } from "./codes-promo-routing.module";
import { CodesPromoComponent } from "./pages/codes-promo/codes-promo.component";
import { DetailCodePromoComponent } from "./pages/detail-code-promo/detail-code-promo.component";
import { CodePromoSerializer } from "./shared/serializer/code-promo.serializer";
import { CodePromoService } from "./shared/service/code-promo.service";

@NgModule({
  declarations: [CodesPromoComponent, DetailCodePromoComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CodesPromoRoutingModule,
    FormsComponentModule,
    UtilsModule,
    CustomTableModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: "btn btn-lg btn-success",
      cancelButtonClass: "btn btn-lg btn-default",
    }),
  ],
  providers: [CodePromoSerializer, CodePromoService],
})
export class CodesPromoModule {}
