import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PLANTATIONS_ROUTES} from "./shared/constant/plantations-route.const";

@NgModule({
  imports: [RouterModule.forChild(PLANTATIONS_ROUTES)]
})
export class PlantationsRoutingModule {
}
