import {Routes} from "@angular/router";
import {UserComponent} from "../../components/user/user.component";
import {AdminGuard} from "../../../../shared/guard/admin.guard";
import {ProfilComponent} from "../../components/profil/profil.component";
import {DendroGuard} from "../../../../shared/guard/dendro.guard";
import {GroupeComponent} from "../../components/groupe/groupe.component";
import {DetailUserComponent} from "../../components/detail-user/detail-user.component";
import {MyProfilComponent} from "../../components/my-profil/my-profil.component";
import {DetailProfilComponent} from "../../components/detail-profil/detail-profil.component";
import {ActivateGroupComponent} from "../../components/activate-group/activate-group.component";

export const GESTION_DROIT_ROUTES: Routes = [
  {path: 'user', component: UserComponent, canActivate: [AdminGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [DendroGuard, AdminGuard]},
  {path: 'groupe', component: GroupeComponent, canActivate: [DendroGuard, AdminGuard]},
  {path: 'user/:id', component: DetailUserComponent, canActivate: [AdminGuard]},
  {path: 'mon-profil', component: MyProfilComponent},
  {path: 'profil/:id', component: DetailProfilComponent},
  {path: 'active-groupe', component: ActivateGroupComponent, canActivate: [DendroGuard, AdminGuard]}
];
