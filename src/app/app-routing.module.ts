import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Layout2Component} from './layout/layout-2/layout-2.component';
import {LayoutBlankComponent} from './layout/layout-blank/layout-blank.component';
// ADMIN
import {AuthGuard} from './shared/guard/auth.guard';
import {DendroGuard} from "./shared/guard/dendro.guard";
import {ManagerGuard} from "./shared/guard/manager.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutBlankComponent,
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'admin',
    component: Layout2Component,
    children: [
      {
        path: 'gestion-droits',
        loadChildren: () => import('./admin/gestion-droits/gestion-droits.module').then(m => m.GestionDroitsModule)
      },
      {
        path: 'plantations',
        loadChildren: () => import('./admin/plantations/plantations.module').then(m => m.PlantationsModule)
      },
      {
        path: 'config-inventaire',
        loadChildren: () => import('./admin/config-inventaire/config-inventaire.module').then(m => m.ConfigInventaireModule),
        canActivate: [DendroGuard]
      },
      {
        path: 'gestion-travaux',
        loadChildren: () => import('./admin/gestion-travaux/gestion-travaux.module').then(m => m.GestionTravauxModule),
        canActivate: [ManagerGuard]
      },
      {
        path: 'contacts',
        loadChildren: () => import('./admin/contacts/contacts.module').then(m => m.ContactsModule),
        canActivate: [DendroGuard]
      },
      {
        // Inventaires features && valid saisie à valider
        path: '',
        loadChildren: () => import('./admin/inventaires/inventaires.module').then(m => m.InventairesModule),
        canActivate: [ManagerGuard]
      },
      {
        path: '',
        loadChildren: () => import('./admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
