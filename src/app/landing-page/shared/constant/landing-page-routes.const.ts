import {Route} from "@angular/router";
import {LoginComponent} from "../../pages/login/login.component";
import {AccueilComponent} from "../../pages/accueil/accueil.component";
import {SignUpComponent} from "../../pages/sign-up/sign-up.component";
import {ConfirmPasswordComponent} from "../../pages/confirm-password/confirm-password.component";
import {PasswordResetComponent} from "../../pages/password-reset/password-reset.component";
import {ContactComponent} from "../../pages/contact/contact.component";
import {Error404Component} from "../../../error-page/error404/error404.component";
import {Error500Component} from "../../../error-page/error500/error500.component";
import { ConditionsGeneralesComponent } from "../../pages/conditions-generales/conditions-generales.component";

export const LANDING_PAGE_ROUTE: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'Inscrire', component: SignUpComponent},
  {path: 'password-confirm/:token', component: ConfirmPasswordComponent},
  {path: 'password-reset', component: PasswordResetComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'accueil', component: AccueilComponent},
  {path: '', component: AccueilComponent},
  {path: 'conditions-generales', component: ConditionsGeneralesComponent},
  {path: 'error-500', component: Error500Component},
  {path: 'error-404', component: Error404Component},
];
