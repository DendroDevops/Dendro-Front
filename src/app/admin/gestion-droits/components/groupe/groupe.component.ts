import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AppService } from '../../../../app.service';
import { ColumnInterface } from '../../../../custom-table/shared/modele/column.interface';
import { CustomAlertService } from '../../../../customAlertService.service';
import { fallIn, moveInUp } from '../../../../router.animations';
import { MESSAGE_INFOS } from "../../../../shared/constants/message.const";
import * as userConst from "../../shared/constant/user.constants";
import { GroupeModele } from '../../shared/model/groupe';
import { GroupeService } from '../../shared/service/groupe.service';

interface CustomGroupeModele extends GroupeModele {
  forfaitName: String;
}

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
  @ViewChild('defaultModal', null)defaultModal: any;

  // DATA TABLE
  searchKeys = ['id', 'name', 'groupeType', 'createdAt'];

  filterVal = '';
  perPage = 10;
  currentPage = 1;
  totalItems = 0;

  groupes: CustomGroupeModele[] = [];
  originalGroupes: GroupeModele[] = [];
  columns: ColumnInterface[] = [
    {
      name: "name",
      display: "Groupe",
      style: { "min-width": "8rem" },
      isModelProperty: true,
      isVisible: true,
      isSort: true,
      isLowerCase: true,
      isString: true,
      tdClassFn: (data) =>
        "mr-1 " +
        (this._groupeService.readyChangeForfait(data) > 2
          ? ""
          : this._groupeService.readyChangeForfait(data) == 0
          ? "forfait-style-warning"
          : this._groupeService.readyChangeForfait(data) < 0
          ? "forfait-style-error"
          : ""),
    },
    {
      name: "forfait",
      display: "Accès",
      style: { "min-width": "8rem" },
      isModelProperty: false,
      isVisible: true,
      isSort: true,
      isComplex: true,
      isString: true,
      tdValue: (groupe: GroupeModele) =>
        this._appService.getDisplayName(groupe.groupeType, this.groupeTypes),
    },
    {
      name: 'licence',
      isNumber: true,
      display: 'Licence',
      style: {"min-width": "4rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true
    },
    {
      name: 'forfaitName',
      isString: true,
      display: 'Forfait',
      style: {"min-width": "4rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
    },
    {
      name: 'duree',
      isString: true,
      display: 'Durée',
      style: {"min-width": "4rem"},
      isModelProperty: false,
      isVisible: true,
      isSort: true,
      isComplex: true,
      tdValue: (groupe: any) => {
        return groupe.forfait == null ? '' : this.forfaitDuration(groupe.forfait.codeForfait) === 'GRATUIT' ?
        this.forfaitDuration(groupe.forfait.codeForfait) : this.forfaitDuration(groupe.forfait.codeForfait)
      }
    },
    {name: 'dateSubscribed', isDate: true, display: 'Date Abonnement',style: {"min-width": "6rem"}, isModelProperty: true, isVisible: true, isSort: true, isObject: false},
    {name: 'dateEcheance', isDate: true, display: 'Date fin', style: {"min-width": "6rem"}, isModelProperty: true, isVisible: true, isSort: true, isObject: false},
    {name: 'actions', isModelProperty: false, isVisible: true, isModal: true, open: (content, options = {}, group: GroupeModele) => this.open(content, options, group), modalComponent: () => this.defaultModal}
  ];
  // END DATA TABLE

  // MODIF ATTRIBUTE
  groupeUpdate: GroupeModele;

  codeForfaitBase: String = '';

  // END ATTRIBUTE
  groupForm: FormGroup;
  groupUpdateForm: FormGroup;

  constructor(
    public _appService: AppService,
    public _groupeService: GroupeService,
    private _customAlertService: CustomAlertService,
    private _modalService: NgbModal,
    private _fb: FormBuilder
  ) {
    // GROUPE SERVICE
    this._appService.pageTitle = 'Groupe';
  }

  ngOnInit() {
    this.listGroupes();
    this.initForm();
    this.initFormUpdate();
  }

  initForm() {
    this.groupForm = this._fb.group({
      'name': ['', Validators.required],
      'licence': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'groupeType': ['FORMULE PREMUIM', Validators.required],
      'forfait': ['GRATUIT', Validators.required]
    });
  }

  initFormUpdate() {
    this.groupUpdateForm = this._fb.group({
      'id': ['', Validators.required],
      'name': ['', Validators.required],
      'licence': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'forfait': ['', Validators.required],
      'groupeType': ['', Validators.required]
    });
  }

  // *** END FONCTION CONTROL FORM
  // Bootstrap Modals
  open(content, options = {}, group: GroupeModele) {
    this.codeForfaitBase = group.forfait.codeForfait;
    this.groupUpdateForm.setValue({
      id: group.id,
      name: group.name,
      groupeType: group.groupeType,
      forfait: group.forfait.codeForfait,
      licence: group.licence
    });
    this._modalService.open(content, options).result.then(() => { }, () => { });
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

    this._groupeService.create(this.groupForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.add, 'toast-top-right', 'success');
        this.listGroupes();
        this.groupForm.reset()
        this.list = true;
      }, err => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(err, 'toast-top-center', 'error');
      });
  }

  listGroupes() {
    this.visibleSpinner = true;
    this._groupeService.list()
      .subscribe((data: GroupeModele[]) => {
        this.visibleSpinner = false;
        this.originalGroupes = data;
        this.originalGroupes.sort((a,b) => b.id - a.id);
        // this.update();
        this.totalItems = data.length;
        this.groupes = this.originalGroupes.map(elm => ({ ...elm, forfaitName: new Object(elm.forfait).hasOwnProperty("name") ? elm.forfait.name : "" }));

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
    this.groupes = data.map(elm => ({ ...elm, forfaitName: new Object(elm.forfait).hasOwnProperty("name") ? elm.forfait.name : "" }));
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

    this._groupeService.update(this.groupUpdateForm.value)
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.update, 'toast-top-right', 'success');
        this.listGroupes();
        this._modalService.dismissAll(ModalDismissReasons.ESC)
      }, err => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(err, 'toast-top-center', 'error');
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
  // END DATATABLE

  delete(id) {
    // DATA DEUIL
    this.visibleSpinner = true;
    this._groupeService.delete(id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(MESSAGE_INFOS.find(elt => elt.name == 'GROUPE').details.delete, 'toast-top-right', 'success');
        this.listGroupes();
      }, (err) => {
        this.visibleSpinner = false;
        this._customAlertService.toastAlert(err, 'toast-top-right', 'error');
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
