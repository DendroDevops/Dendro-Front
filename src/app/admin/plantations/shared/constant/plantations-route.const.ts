import { Routes } from "@angular/router";
import { ManagerGuard } from "../../../../shared/guard/manager.guard";
import { PlantationsComponent } from "../../components/plantations/plantations.component";

export const PLANTATIONS_ROUTES: Routes = [
  {
    path: '',
    component: PlantationsComponent,
    canActivate: [ManagerGuard]
  }
];
