import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from "./components/user/user.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {GroupeComponent} from "./components/groupe/groupe.component";
import {DetailUserComponent} from "./components/detail-user/detail-user.component";
import {MyProfilComponent} from "./components/my-profil/my-profil.component";
import {DetailProfilComponent} from "./components/detail-profil/detail-profil.component";
import {ActivateGroupComponent} from "./components/activate-group/activate-group.component";
import {UserSerializer} from "./shared/serializer/user.serializer";
import {UserService} from "./shared/service/user.service";
import {DroitService} from "./shared/service/droit.service";
import {ProfilService} from "./shared/service/profil.service";
import {GroupeSerializer} from "./shared/serializer/groupe.serializer";
import {DroitSerializer} from "./shared/serializer/droit.serializer";
import {GestionDroitsRoutingModule} from "./gestion-droits-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SweetAlert2Module} from "@toverux/ngx-sweetalert2";
import {NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomDateApaterService} from "../../shared/service/custom-date-apater.service";
import {CustomDateParserFormatterService} from "../../shared/service/custom-date-parser-formatter.service";
import {CustomDatepickerI18n} from "../../shared/service/i18n.service";
import {ImageCropperModule} from "ng2-img-cropper";
import {TextMaskModule} from "angular2-text-mask";
import {GroupeService} from "./shared/service/groupe.service";
import {ProfilSerializer} from "./shared/serializer/profil.serializer";
import {InventaireService} from "../inventaires/shared/service/inventaire.service";
import {InventaireSerializer} from "../inventaires/shared/serializer/inventaire.serializer";
import {FormsComponentModule} from "../../forms-component/forms-component.module";
import {CustomTableModule} from "../../custom-table/custom-table.module";
import {UtilsModule} from "../../utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-lg btn-success',
      cancelButtonClass: 'btn btn-lg btn-default'
    }),
    GestionDroitsRoutingModule,
    NgbModule.forRoot(),
    ImageCropperModule,
    TextMaskModule,
    FormsComponentModule,
    CustomTableModule,
    UtilsModule
  ],
  providers: [
    UserSerializer,
    UserService,
    DroitService,
    ProfilService,
    ProfilSerializer,
    GroupeSerializer,
    DroitSerializer,
    GroupeService,
    InventaireService,
    InventaireSerializer,
    {provide: NgbDateAdapter, useClass: CustomDateApaterService},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService},
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}
  ],
  declarations: [
    UserComponent,
    ProfilComponent,
    GroupeComponent,
    DetailUserComponent,

    MyProfilComponent,
    DetailProfilComponent,
    ActivateGroupComponent
  ]
})
export class GestionDroitsModule {
}
