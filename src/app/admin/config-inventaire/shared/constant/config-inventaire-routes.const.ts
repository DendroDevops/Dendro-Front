import {Routes} from "@angular/router";
import {ConfigChampignonsComponent} from "../../pages/config-champignons/config-champignons.component";
import {ConfigEspeceComponent} from "../../pages/config-espece/config-espece.component";
import {DetailChampignonsComponent} from "../../pages/detail-champignons/detail-champignons.component";
import {DetailEspeceComponent} from "../../pages/detail-espece/detail-espece.component";

export const CONFIG_INVENTAIRE_ROUTES: Routes = [
  {path: 'champignons', component: ConfigChampignonsComponent},
  {path: 'espece', component: ConfigEspeceComponent},
  {path: 'champignons/:id', component: DetailChampignonsComponent},
  {path: 'espece/:id', component: DetailEspeceComponent}
]
