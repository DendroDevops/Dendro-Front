import {Routes} from "@angular/router";
import {InventairesComponent} from "../../pages/inventaires/inventaires.component";
import {ModifInventaireComponent} from "../../pages/modif-inventaire/modif-inventaire.component";
import {GeoInventairesComponent} from "../../pages/geo-inventaires/geo-inventaires.component";
import {DetailEssenceComponent} from "../../pages/detail-essence/detail-essence.component";
import {AddEssenceComponent} from "../../pages/add-essence/add-essence.component";
import {DetailInventaireComponent} from "../../pages/detail-inventaire/detail-inventaire.component";
import {SaisieValideComponent} from "../../pages/saisie-valide/saisie-valide.component";
import {DetailArbreComponent} from "../../pages/detail-arbre/detail-arbre.component";
import {ModifEssenceComponent} from "../../pages/modif-essence/modif-essence.component";
import {PrintDetailInventaireComponent} from "../../pages/print-detail-inventaire/print-detail-inventaire.component";
import {PrintInventaireComponent} from "../../pages/print-inventaire/print-inventaire.component";
import { PrintInventairesComponent } from "../../pages/print-inventaires/print-inventaires.component";
import { PrintDetailsInventairesComponent } from "../../pages/print-details-inventaires/print-details-inventaires.component";

export const INVENTAIRES_ROUTES: Routes = [
  {
    path: 'inventaires',
    children: [
      {path: '', component: InventairesComponent},
      {path: 'modifier/:id', component: ModifInventaireComponent},
      {path: 'essence/:id', component: DetailEssenceComponent},
      {path: 'essence/add/:id', component: AddEssenceComponent},
      {path: ':id', component: DetailInventaireComponent},
      {path: 'arbre/:id', component: DetailArbreComponent},
      {path: 'essence/modifier/:id', component: ModifEssenceComponent},
      {path: 'detail/print', component: PrintDetailInventaireComponent},
      {path: 'details/print', component: PrintDetailsInventairesComponent},
    ]
  },
  {
    path: 'print-inventaire/:id',
    component: PrintInventaireComponent
  },
  {
    path: 'print-inventaires',
    component: PrintInventairesComponent
  },
  {
    path: 'geo-inventaires',
    component: GeoInventairesComponent
  },
  {
    path: 'saisie-valide',
    component: SaisieValideComponent
  }
]
