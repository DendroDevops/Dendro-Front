import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Layout2Component} from './layout-2/layout-2.component';
import {LayoutBlankComponent} from './layout-blank/layout-blank.component';
import {LayoutNavbarComponent} from './layout-navbar/layout-navbar.component';
import {LayoutSidenavComponent} from './layout-sidenav/layout-sidenav.component';
import {LayoutFooterComponent} from './layout-footer/layout-footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidenavModule} from '../../vendor/libs/sidenav/sidenav.module';
import {LayoutService} from './layout.service';
import {UserService} from "../admin/gestion-droits/shared/service/user.service";
import {UserSerializer} from "../admin/gestion-droits/shared/serializer/user.serializer";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    SidenavModule
  ],
  declarations: [
    Layout2Component,
    LayoutBlankComponent,

    LayoutNavbarComponent,
    LayoutSidenavComponent,
    LayoutFooterComponent
  ],
  providers: [
    LayoutService,
    UserService,
    UserSerializer
  ]
})
export class LayoutModule {
}
