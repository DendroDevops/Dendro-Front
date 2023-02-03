import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../shared/service/auth.service';
import {AppService} from '../../../../app.service';

import {fallIn, moveInLeft, moveInUp} from '../../../../router.animations';
import {ControlService} from '../../../../shared/service/control.service';
import {CustomAlertService} from '../../../../customAlertService.service';
import {InventaireService} from "../../../inventaires/shared/service/inventaire.service";

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as userConst from "../../shared/constant/user.constants";
import {UserService} from "../../shared/service/user.service";
import {UserModele} from "../../shared/model/user";
import {ForfaitService} from "../../shared/service/forfait.service";
import {ProfilService} from "../../shared/service/profil.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InventaireStat} from "../../../inventaires/shared/model/inventaire-stat";
import {IOption} from "ng-select";
import {ProfilModele} from "../../shared/model/profil";


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: [
    './detail-user.component.scss',
    '../../../../../vendor/styles/pages/users.scss',
    '../../../../../vendor/libs/ng2-dropdown-menu/ng2-dropdown-menu.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn(), moveInLeft()]
})
export class DetailUserComponent {
  forfaitTypes = userConst.FORFAIT_TYPE;

  state: any;
  droit: string;
  items: any;

  displayCodeForfait = '';
  profilPop: any;

  visibleSpinner = true;
  disabled = true;

  password: string;

  user: UserModele;
  profilsOptions: IOption[] = [];

  inventaireStat: InventaireStat;

  userForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public appService: AppService,
    private controlService: ControlService,
    private customAlertService: CustomAlertService,
    private inventaireService: InventaireService,
    private modalService: NgbModal,
    private userService: UserService,
    private forfaitService: ForfaitService,
    private profilService: ProfilService,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.getStatUser();
    this.initForm()
  }

  initForm() {
    this.userForm = this.fb.group({
      'id': ['', Validators.required],
      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'profil': ['', Validators.required]
    });
    this.getUser();
  }

  modiferProfil() {
    this.visibleSpinner = true;
    this.userService.updateProfilUser(this.user.id, this.profilPop.id)
      .subscribe(() => {
        this.customAlertService.toastAlert("Profil utilisateur modifié avec succès", 'toast-top-right', 'success');
        this.getUser();
        this.visibleSpinner = false;
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Impossible de modifier ce profil', 'toast-top-right', 'error');
      })
  }

  open(content, options = {}, profil) {
    profil.id = profil.id.toString()
    this.profilPop = profil;
    this.modalService.open(content, options).result.then((result) => {
    }, () => {
    });
  }

  getUser() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.read(parseInt(id))
      .subscribe((data: UserModele) => {
        this.user = data;
        this.listProfil();
        // Display codeForfait
        this.displayCodeForfait = this.forfaitService.getDisplayNameForfait(this.user.groupe.forfait.codeForfait);
        // set userForm
        this.userForm.setValue({
          id: this.user.id,
          username: this.user.username,
          email: this.user.email,
          profil: this.user.profil.id.toString()
        });

        this.profilService.read(this.user.profil.id)
          .subscribe((response: ProfilModele) => {
            this.visibleSpinner = false;
            this.droit = response.droit.name;
          }, () => {
          });
      }, () => {
      });
  }

  listProfil() {
    this.visibleSpinner = true;
    this.profilService.allProfilGroupe(this.user.groupe.id)
      .subscribe(data => {
        this.visibleSpinner = false;
        this.profilsOptions = data.map(elt => {
          return {
            label: elt.name,
            value: elt.id.toString()
          }
        });
      }, () => {
        this.visibleSpinner = false;
      });
  }

  DesactiveOrActive(data) {
    this.userService.activeOrDesactive(data)
      .subscribe(() => {
        this.getUser();
        this.customAlertService.toastAlert('Status changé avec succès', 'toast-top-right', 'success');
      }, () => {
        this.customAlertService.toastAlert('Impossible de modifier ce status', 'toast-top-right', 'error');
      })
  }


  onEmailConfirm(idUser: number) {
    this.userService.sendMailConfirmEmail(idUser)
      .subscribe((res: string) => {
        this.customAlertService.toastAlert('Status changé avec succès', 'toast-top-right', 'success');
      }, () => {
        this.customAlertService.toastAlert('Impossible de modifier ce status', 'toast-top-right', 'error');
      })
  }

  resetPassword(id: number) {
    this.userService.reinitilaisePassword(id)
      .subscribe((response: any) => {
        this.customAlertService.toastAlert(response.message, 'toast-top-right', 'success');
      }, () => {
        this.customAlertService.toastAlert('Impossible de modifier ce status', 'toast-top-right', 'error');
      })
  }

  getStatUser() {
    this.inventaireService.getInventairesStat()
      .subscribe((response: InventaireStat) => {
        this.inventaireStat = response
      }, () => {

      })
  }

  updateUser() {
    // UPDATE USERS
    this.visibleSpinner = true;
    if (this.userForm.get('username').errors || this.userForm.get('profil').errors
      || this.userForm.get('email').errors || this.userForm.get('id').errors) return;
    this.userService.updateUser(this.userForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Compte modifié avec succès', 'toast-top-right', 'success');
        this.getUser();
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Modification impossible', 'toast-top-right', 'error');
      })
  }
}
