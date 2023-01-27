import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DASHBOARD_ROUTES} from "./shared/constant/dashboard-routes.const";

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)]
})

export class DashboardRoutingModule {

}
