import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {INVENTAIRES_ROUTES} from "./shared/constant/inventaires-routes.const";

@NgModule({
  imports: [RouterModule.forChild(INVENTAIRES_ROUTES)]
})

export class InventairesRoutingModule {

}
