import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../../app.service';
import {AuthService} from '../../../../shared/service/auth.service';

import {Router} from '@angular/router';
import {UserModele} from '../../shared/model/user';
import {PWDREGEX} from '../../../../shared/service/control.service';
import {CustomAlertService} from '../../../../customAlertService.service';
import {fallIn, moveInUp} from '../../../../router.animations';
import {GroupeService} from '../../shared/service/groupe.service';
import {UserService} from "../../shared/service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../../../../shared/helpers/customValidatorForm";
import {ProfilModele} from "../../shared/model/profil";
import {ProfilService} from "../../shared/service/profil.service";
import {IOption} from "ng-select";
import {GroupeModele} from "../../shared/model/groupe";

// ANIMATIONS

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
  datas: UserModele[] = [];
  originalDatas: UserModele[] = [];

  droits: any = [];
  searchKeys = ['id', 'username', 'email'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
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
        this.update();
      }, () => {
      });
  }

  DesactiveOrActive(data: UserModele) {
    this.userService.activeOrDesactive(data)
      .subscribe(() => {
        this.lists();
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
    this.sort(data);
    this.datas = this.paginate(data);
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

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) {
        return this.sortDesc ? 1 : -1;
      }
      if (a > b) {
        return this.sortDesc ? -1 : 1;
      }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }
    this.currentPage = 1;
    this.update();
  }
}
