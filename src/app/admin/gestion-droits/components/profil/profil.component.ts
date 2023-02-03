import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../../app.service';
import {CustomAlertService} from '../../../../customAlertService.service';

import {ProfilModele} from '../../shared/model/profil';

import {fallIn, moveInUp} from '../../../../router.animations';
import {GroupeService} from '../../shared/service/groupe.service';
import {Router} from '@angular/router';

import * as userConst from '../../shared/constant/user.constants';
import {ProfilService} from "../../shared/service/profil.service";
import {DroitService} from "../../shared/service/droit.service";
import {DroitModele} from "../../shared/model/droit";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IOption} from "ng-select";
import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: [
    './profil.component.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/ng2-dropdown-menu/ng2-dropdown-menu.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class ProfilComponent implements OnInit {

  state: any;
  error = {
    showError: false,
    message: ''
  };

  groupeTypes = userConst.USER_GROUPE_TYPE;

  list = true;
  visibleSpinner = false;
  // DATA TABLE
  searchKeys = ['id', 'name'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  profils: ProfilModele[] = [];
  originalProfils: ProfilModele[] = [];

  disabled: false;
  profilForm: FormGroup;
  droitOptions: Array<IOption> = [];

  columns: ColumnInterface[] = [
    {name: 'name', display: 'Profil', style: 'min-width: 18rem', isModelProperty: true, isVisible: true},
    {
      name: 'droit',
      isObject: true,
      display: 'Droit',
      style: 'min-width: 18rem',
      isModelProperty: true,
      isVisible: true,
      objectName: 'name'
    },
    {name: 'createdAt', isDate: true, display: 'Date création', isModelProperty: true, isVisible: true},
    {name: 'actions', style: '', isModelProperty: false, isVisible: true}
  ];

  constructor(
    private appService: AppService,
    private groupeService: GroupeService,
    private customAlertService: CustomAlertService,
    private route: Router,
    private profilService: ProfilService,
    private droitService: DroitService,
    private fb: FormBuilder
  ) {
    this.appService.pageTitle = 'Profil';
  }

  ngOnInit() {
    this.lists();
    this.getArrayDroits();
    this.initForm()
  }

  initForm() {
    this.profilForm = this.fb.group({
      'name': ['', Validators.required],
      'droit': [[], Validators.required],
      'groupeType': ['FORMULE PREMUIM', Validators.required]
    });
  }

  getArrayDroits() {
    this.droitService.list()
      .subscribe((data: DroitModele[]) => {
        this.droitOptions = data.map(elt => {
          return {
            value: elt.id.toString(),
            label: elt.name
          }
        });
      });
  }

  add() {
    this.visibleSpinner = false;
    if (this.profilForm.invalid) {
      this.visibleSpinner = false;
      this.customAlertService.toastAlert('Saisir Informations obligatoire', 'toast-top-center', 'error');
    }
    // DANS LE CAS TOUT EST BON
    this.profilService.create(this.profilForm.value)
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(data.message, 'toast-top-right', 'success');
        this.lists();
        this.profilForm.reset();
        this.list = true;
      }, err => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-center', 'error');
      });

  }

  lists() {
    this.visibleSpinner = true;
    this.profilService.list()
      .subscribe((data: ProfilModele[]) => {
        this.visibleSpinner = false;
        this.originalProfils = data;
        this.update();
      }, () => {
        this.visibleSpinner = false;
      });
  }

  showUser(id) {
    this.visibleSpinner = true;
    this.profilService.read(id)
      .subscribe((data: ProfilModele) => {
        this.visibleSpinner = false;
        this.route.navigate([`/admin/gestion-droits/profil/${id}`]);
      }, () => {
      });
  }

  delete(id) {
    this.profilService.delete(id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Profil supprimé avec succès', 'toast-top-right', 'success');
        this.lists();
      }, err => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err.error.message, 'toast-top-right', 'success')
      });
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalProfils);
    this.totalItems = data.length;

    this.sort(data);
    this.profils = this.paginate(data);
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
