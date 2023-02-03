import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LANDING_PAGE_ROUTE} from "./shared/constant/landing-page-routes.const";

@NgModule({
  imports: [RouterModule.forChild(LANDING_PAGE_ROUTE)],
  exports: [RouterModule]
})

export class LandingPageRoutingModule {

}
