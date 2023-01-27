import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { IOption } from "ng-select";
import { AppService } from '../../../../app.service';
import { ColumnInterface } from '../../../../custom-table/shared/modele/column.interface';
import { CustomAlertService } from '../../../../customAlertService.service';
import { fallIn, moveInUp } from '../../../../router.animations';
import { PasswordValidation } from "../../../../shared/helpers/customValidatorForm";
import { AuthService } from '../../../../shared/service/auth.service';
import { PWDREGEX } from '../../../../shared/service/control.service';
import { GroupeModele } from "../../shared/model/groupe";
import { ProfilModele } from "../../shared/model/profil";
import { UserModele } from '../../shared/model/user';
import { GroupeService } from '../../shared/service/groupe.service';
import { ProfilService } from "../../shared/service/profil.service";
import { UserService } from "../../shared/service/user.service";

interface customUserModele extends UserModele{
  profileName: string;
  groupName: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    './user.component.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class UserComponent implements OnInit {
  state: any;

  list = true;
  profilsOptions: IOption[] = [];

  // DATA TABLE
  datas: customUserModele[] = [];
  originalDatas: UserModele[] = [];
  columns: ColumnInterface[] = [
    {name: 'groupName', display: 'GROUPE', style: {"min-width": "10rem"}, isModelProperty: true, isVisible: true, isSort: true, isLowerCase: true, isString: true},
    {name: 'forfait', display: 'FORFAIT', style: {"min-width": "10rem"}, isModelProperty: false, isVisible: true, isSort: true, isComplex: true,isString: true, tdValue: (data: UserModele) => (new Object(data)).hasOwnProperty("groupe") ? (new Object(data.groupe.forfait)).hasOwnProperty("name") ? data.groupe.forfait.name : "" : '',},
    {name: 'dateSubscribed', isDate: true, display: 'DATE ABONNEMENT', style: {"min-width": "10rem"}, isModelProperty: true, isVisible: true, isSort: true, isObject: true, objectName: "groupe"},
    {name: 'dateEcheance', isDate: true, display: 'DATE FIN', style: {"min-width": "10rem"}, isModelProperty: true, isVisible: true, isSort: true, isObject: true, objectName: "groupe"},
    {
      name: 'username',
      isString: true,
      display: 'NOM UTILISATEUR',
      style: {"min-width": "12rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
    },
    {
      name: 'email',
      isString: true,
      display: 'EMAIL',
      style: {"min-width": "14rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
    },
    {
      name: 'profileName',
      display: 'PROFIL',
      style: {"min-width": "10rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
      isString: true,
    },
    {
      name: 'emailActive',
      display: 'COMPTE VERIFIE',
      style: {"min-width": "10rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
      isIcon: true,
      isNumber: true,
      tdClass: "align-middle text-center",
      icons: {iconSuccesClass: "ion ion-ios-checkmark-circle text-success text-large  align-middle mr-2", iconErrorClass: "ion ion-ios-close-circle text-danger text-large align-middle mr-2"}
    },
    {name: 'createdAt', isDate: true, display: 'Date création', isModelProperty: true, isVisible: true, isSort: true, isObject: false},
    {name: 'isActive', display: "STATUT", isModelProperty: false, isVisible: true, isSwitcher: true, switchFunc: (data, idx: number) => this.desactiveOrActive(data, idx) },
    {name: 'actions', style: {"min-width": "2rem"}, isModelProperty: false, isVisible: true}
  ];

  droits: any = [];
  searchKeys = ['id', 'username', 'email'];

  filterVal = '';
  perPage = 10;
  currentPage = 1;
  totalItems = 0;
  // END DATA TABLE

  visibleSpinner = false;
  groupeOptions: IOption[] = [];
  //
  displayDendro = false;
  userForm: FormGroup;

  constructor(public appService: AppService,
              private authService: AuthService,
              private groupeService: GroupeService,
              private route: Router,
              private customAlertService: CustomAlertService,
              private userService: UserService,
              private fb: FormBuilder,
              private profilService: ProfilService
  ) {
    // USERS
    this.appService.pageTitle = 'Utilisateur';
  }

  ngOnInit() {
    this.lists();
    this.listProfil();
    this.listGroupes();
    this.displayDendro = this.authService.isDendro();
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(PWDREGEX)]],
      'profil': ['', Validators.required],
      'groupe': [''],
      'passwordConfirm': ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

// ************************* LIST ALL USER ******************************** //
  listGroupes() {
    this.groupeService.list()
      .subscribe(data => {
        this.groupeOptions = data.map((groupe: GroupeModele) => {
          return {
            label: groupe.name,
            value: groupe.id.toString()
          }
        })
      });
  }

  lists() {
    this.visibleSpinner = true;
    this.userService.list()
      .subscribe((data: UserModele[]) => {
        this.visibleSpinner = false;
        this.originalDatas = data.filter((user: UserModele) => user.id !== this.authService.decodeToken.data.id);
        this.originalDatas.sort((a,b) => b.id - a.id);
        // this.update();
        this.totalItems = data.length;
        this.datas = this.originalDatas.map(elm => ({...elm, profileName: elm.profil.name, groupName: elm.groupe.name}));
      }, () => {
      });
  }

  desactiveOrActive(data: customUserModele, idx: number) {
    this.userService.activeOrDesactive(data)
      .subscribe(() => {
        // this.lists();
        data.isActive = !data.isActive;
        this.datas[idx] = data;
        this.customAlertService.toastAlert('Statut changé avec succès', 'toast-top-right', 'success');
      }, () => {
        this.customAlertService.toastAlert('Impossible de modifier ce status', 'toast-top-right', 'error');
      })
  }

  onAdd() {
    if (this.userForm.get('username').errors || this.userForm.get('email').errors ||
      this.userForm.get('password').errors || this.userForm.get('passwordConfirm').errors) return;

    if (this.displayDendro && !this.userForm.get('groupe').value) return;

    this.userService.create(this.userForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Enrégistrement réussi', 'toast-top-right', 'success');
        this.lists();
        this.list = true;
        this.userForm.reset();
      }, (err) => {
        // ERROR
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      });
  }

  delete(id: number) {
    // DATA DEUIL
    this.visibleSpinner = true;
    this.userService.delete(id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Suppresion effectué avec succès', 'toast-top-right', 'success');
        this.lists();
      }, (err: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'warning');
      });
  }

  showUser(id) {
    this.visibleSpinner = true;
    this.userService.read(id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.route.navigate([`/admin/gestion-droits/user/${id}`]);
      }, () => {
      });
  }

// *********************************************
  listProfil() {
    this.profilService.list()
      .subscribe((data: ProfilModele[]) => {
        this.profilsOptions = data.map((elt: ProfilModele) => {
          return {
            label: elt.name,
            value: elt.id.toString()
          };
        });
      }, () => {
        this.visibleSpinner = false;
      });
  }

  onProfilGroupe() {
    // GET PROFIL GROUPE CORRESPONDANT
    if (this.userForm.get('groupe').errors) return;

    this.profilService.allProfilGroupe(this.userForm.value.groupe)
      .subscribe(data => {
        this.profilsOptions = data.map((elt: ProfilModele) => {
          return {
            label: elt.name,
            value: elt.id.toString()
          }
        });
      }, () => {
        this.visibleSpinner = false;
      });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalDatas);
    this.totalItems = data.length;
    this.datas = data;
  }

  filter(data) {
    const filter = this.filterVal.toLowerCase();
    return !filter ?
      data.slice(0) :
      data.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(filter) !== -1 || !filter;
      });
  }
}
