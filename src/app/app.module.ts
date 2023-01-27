import {Title} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {LayoutModule} from './layout/layout.module';
import {NgxImageGalleryModule} from 'ngx-image-gallery';
// *******************************************************************************
// Service
import {AuthService} from './shared/service/auth.service';
import {CustomAlertService} from './customAlertService.service';
import {ControlService} from './shared/service/control.service';

import {JwtInterceptor} from './shared/helpers/jwt.interceptor';
import {ErrorInterceptor} from './shared/helpers/error.interceptor';
import {ContactService} from './admin/contacts/shared/service/contactService.service';
import {NgModule} from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";
import {SidenavModule} from "../vendor/libs/sidenav/sidenav.module";
import {ManagerGuard} from "./shared/guard/manager.guard";
import {ToastrModule} from "ngx-toastr";
import {CustomDateApaterService} from "./shared/service/custom-date-apater.service";
import {CustomDateParserFormatterService} from "./shared/service/custom-date-parser-formatter.service";
import {CustomDatepickerI18n, I18nService} from "./shared/service/i18n.service";
import {PreviousUrlService} from "./@Dendromap/components/filter-table/service/previous-url.service";

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    // App
    AppRoutingModule,
    LayoutModule,
    // ADMIN MODULE
    HttpClientModule,
    NgxImageGalleryModule,
    // Libs
    MultiselectDropdownModule,
    SidenavModule,
    ToastrModule.forRoot()
  ],
  providers: [
    Title,
    AppService,
    AuthService,
    CustomAlertService,
    ControlService,
    ContactService,
    // JWT
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ManagerGuard,
    {provide: NgbDateAdapter, useClass: CustomDateApaterService},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService},
    I18nService,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    PreviousUrlService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
