import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GESTION_TRAVAUX_ROUTES} from "./shared/constant/gestion-travaux-routes.const";

@NgModule({
  imports: [RouterModule.forChild(GESTION_TRAVAUX_ROUTES)]
})

export class GestionTravauxRoutingModule {

}
