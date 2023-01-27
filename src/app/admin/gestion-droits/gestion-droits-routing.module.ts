import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {GESTION_DROIT_ROUTES} from "./shared/constant/gestion-droits-routes.const";


@NgModule({
  imports: [RouterModule.forChild(GESTION_DROIT_ROUTES)]
})

export class GestionDroitsRoutingModule {
}
