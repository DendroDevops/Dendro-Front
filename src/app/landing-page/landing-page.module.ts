import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AgmCoreModule} from "@agm/core";

import {AccueilComponent} from "./pages/accueil/accueil.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {PasswordResetComponent} from "./pages/password-reset/password-reset.component";
import {ServicesComponent} from "./pages/services/services.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {LoginComponent} from "./pages/login/login.component";
import {FooterComponent} from "./static/footer/footer.component";
import {HeaderComponent} from "./static/header/header.component";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmPasswordComponent} from './pages/confirm-password/confirm-password.component';
import {LandingPageRoutingModule} from "./landing-page-routing.module";
import {Error404Component} from "../error-page/error404/error404.component";
import {Error500Component} from "../error-page/error500/error500.component";
import {TextMaskModule} from "angular2-text-mask";
import {ConfirmEmailComponent} from "./pages/confirm-email/confirm-email.component";
import { ConditionsGeneralesComponent } from './pages/conditions-generales/conditions-generales.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtsQeeMq9e8CkZiTiUd-DsdIBrJaOek5A'
    }),
    LandingPageRoutingModule,
    TextMaskModule
  ],
  declarations: [
    AccueilComponent,
    ContactComponent,
    PasswordResetComponent,
    ServicesComponent,
    SignUpComponent,
    LoginComponent,

    FooterComponent,
    HeaderComponent,
    ConfirmPasswordComponent,
    Error404Component,
    Error500Component,
    ConfirmEmailComponent,
    ConditionsGeneralesComponent
  ],
  providers: []
})

export class LandingPageModule {

}
