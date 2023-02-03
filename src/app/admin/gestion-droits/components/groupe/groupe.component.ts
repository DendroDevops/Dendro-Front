import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../../app.service';
import {CustomAlertService} from '../../../../customAlertService.service';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fallIn, moveInUp} from '../../../../router.animations';
import {GroupeModele} from '../../shared/model/groupe';
import {ControlService} from '../../../../shared/service/control.service';
import {GroupeService} from '../../shared/service/groupe.service';
import * as userConst from "../../shared/constant/user.constants";

import * as moment from 'moment'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MESSAGE_INFOS} from "../../../../shared/constants/message.const";

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: [
    './groupe.component.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]

})
export class GroupeComponent implements OnInit {
  state: any;
  list = true;
  visibleSpinner = false;

  groupeTypes = userConst.USER_GROUPE_TYPE;

  // DATA TABLE
  searchKeys = ['id', 'name', 'groupeType', 'createdAt'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  groupes: GroupeModele[] = [];
  originalGroupes: GroupeModele[] = [];
  // END DATA TABLE

  // MODIF ATTRIBUTE
  groupeUpdate: GroupeModele;

  codeForfaitBase: String = '';

  // END ATTRIBUTE
  groupForm: FormGroup;
  groupUpdateForm: FormGroup;

  constructor(
    public appService: AppService,
    public groupeService: GroupeService,
    private customAlertService: CustomAlertService,
    private modalService: NgbModal,
    private controlService: ControlService,
    private fb: FormBuilder
  ) {
    // GROUPE SERVICE
    this.appService.pageTitle = 'Groupe';
  }

  ngOnInit() {
    this.listGroupes();
    this.initForm();
    this.initFormUpdate();
  }

  initForm() {
    this.groupForm = this.fb.group({
      'name': ['', Validators.required],
      'licence': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'groupeType': ['FORMULE PREMUIM', Validators.required],
      'forfait': ['GRATUIT', Validators.required]
    });
  }

  initFormUpdate() {
    this.groupUpdateForm = this.fb.group({
      'id': ['', Validators.required],
      'name': ['', Validators.required],
      'licence': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'forfait': ['', Validators.required],
      'groupeType': ['', Validators.required]
    });
  }

  // *** END FONCTION CONTROL FORM
  // Bootstrap Modals
  //
  open(content, options = {}, group: GroupeModele) {
    this.codeForfaitBase = group.forfait.codeForfait;
    this.groupUpdateForm.setValue({
      id: group.id,
      name: group.name,
      groupeType: group.groupeType,
      forfait: group.forfait.codeForfait,
      licence: group.licence
    });
    this.modalService.open(content, options).result.then(() => {

    }, () => {

    });
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {

      return `with: ${reason}`;
    }
  }

  // FONCTION ADD
  add() {
    this.visibleSpinner = true;
    if (this.groupForm.get('name').errors || this.groupForm.get('groupeType').errors) return;

    if (this.groupForm.value.groupeType != 'DENDROMAP') {
      if (this.groupForm.get('licence').errors || this.groupForm.get('forfait').errors) return;
    } else {
      this.groupForm.value.licence = null;
      this.groupForm.value.forfait = null;
    }

    this.groupeService.create(this.groupForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.add, 'toast-top-right', 'success');
        this.listGroupes();
        this.groupForm.reset()
        this.list = true;
      }, err => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-center', 'error');
      });
  }

  listGroupes() {
    this.visibleSpinner = true;
    this.groupeService.list()
      .subscribe((data: GroupeModele[]) => {
        this.visibleSpinner = false;
        this.originalGroupes = data;
        this.update();
      }, () => {
        this.visibleSpinner = false;
      });
  }

  // DATA TABLE
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalGroupes);
    this.totalItems = data.length;

    this.sort(data);
    this.groupes = this.paginate(data);
  }

  updateGroupe() {
    // UPDATE GROUPE
    this.visibleSpinner = true;
    if (this.groupUpdateForm.get('name').errors || this.groupUpdateForm.get('groupeType').errors) return;

    if (this.groupUpdateForm.value.groupeType != 'DENDROMAP') {
      if (this.groupUpdateForm.get('licence').errors || this.groupUpdateForm.get('forfait').errors) return;
    } else {
      this.groupUpdateForm.value.licence = null;
      this.groupUpdateForm.value.forfait = null;
    }

    this.groupeService.update(this.groupUpdateForm.value)
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.update, 'toast-top-right', 'success');
        this.listGroupes();
        GroupeComponent.getDismissReason(ModalDismissReasons.ESC);
      }, err => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-center', 'error');
      })
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

  // END DATATABLE

  delete(id) {
    // DATA DEUIL
    this.visibleSpinner = true;
    this.groupeService.delete(id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.delete, 'toast-top-right', 'success');
        this.listGroupes();
      }, (err) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      });
  }

  // GET DUREE FORFAIT BY CODEFORFAIT
  public forfaitDuration(chaine: string): string {
    return chaine == '1M_FREE' ? '1 mois essai gratuit' :
      chaine === 'GRATUIT' ? 'GRATUIT' : chaine.split('M')[0] + ' mois';
  }

  public getExpiredDateForfaitFormNow(duration): any {
    return duration == 12 ? moment().add(1, 'y') : moment().add(duration, 'M');
  }

}
