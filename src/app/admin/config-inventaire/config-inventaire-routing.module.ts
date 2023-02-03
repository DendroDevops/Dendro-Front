import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CONFIG_INVENTAIRE_ROUTES} from "./shared/constant/config-inventaire-routes.const";

@NgModule({
  imports: [RouterModule.forChild(CONFIG_INVENTAIRE_ROUTES)]
})

export class ConfigInventaireRoutingModule {
  constructor() {
  }
}
