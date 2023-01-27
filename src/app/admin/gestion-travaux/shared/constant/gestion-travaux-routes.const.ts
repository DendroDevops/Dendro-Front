import {AlerteComponent} from "../../components/alerte/alerte.component";
import {TravauxComponent} from "../../components/travaux/travaux.component";
import {ExamenComponent} from "../../components/examen/examen.component";

export const GESTION_TRAVAUX_ROUTES = [
  {path: 'alerte', component: AlerteComponent},
  {path: 'travaux', component: TravauxComponent},
  {path: 'examen', component: ExamenComponent}
]
