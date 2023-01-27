import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from "moment";
import { AppService } from "../../../../app.service";
import { ColumnInterface } from '../../../../custom-table/shared/modele/column.interface';
import { CustomAlertService } from "../../../../customAlertService.service";
import { fallIn, moveInUp } from "../../../../router.animations";
import * as userConst from "../../shared/constant/user.constants";
import { GroupeModele } from "../../shared/model/groupe";
import { GroupeService } from "../../shared/service/groupe.service";


interface CustomGroupeModele extends GroupeModele {
  forfaitName: String;
}
@Component({
  selector: 'app-activate-group',
  templateUrl: './activate-group.component.html',
  styleUrls: ['./activate-group.component.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class ActivateGroupComponent implements OnInit {

  // DATA TABLE
  state: any;
  searchKeys = ['id', 'name', 'groupeType', 'createdAt'];

  filterVal = '';
  perPage = 10;
  currentPage = 1;
  totalItems = 0;

  groupes: CustomGroupeModele[] = [];
  originalGroupes: GroupeModele[] = [];
  columns: ColumnInterface[] = [
    { name: 'check', isCheck: true, style: {}, isModelProperty: false, isVisible: true },
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
    {name: 'actions', isModelProperty: false, isVisible: true}
  ];

  visibleSpinner = false;
  groupeTypes = userConst.USER_GROUPE_TYPE;

  selectAllStatus = false;

  constructor(
    public _groupeService: GroupeService,
    public _appService: AppService,
    private _customAlertService: CustomAlertService,
  ) {
  }

  ngOnInit() {
    this.allGroupsNoStripped();
  }

  allGroupsNoStripped() {
    this.visibleSpinner = true;
    this._groupeService.getAllNoStripped()
      .subscribe((res: GroupeModele[]) => {
        this.visibleSpinner = false;
        this.originalGroupes = res;
        this.originalGroupes.sort((a,b) => b.id - a.id);
        this.totalItems = this.originalGroupes.length;
        this.groupes = this.originalGroupes.map(elm => ({...elm, forfaitName: new Object(elm.forfait).hasOwnProperty("name") ? elm.forfait.name : ""}));
      }, () => {
      })
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalGroupes);
    this.totalItems = data.length;
    this.groupes = data.map((elm: GroupeModele) => ({...elm, forfaitName: new Object(elm.forfait).hasOwnProperty("name") ? elm.forfait.name : ""}));
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

  public forfaitDuration(chaine: string): string {
    return chaine == '1M_FREE' ? '1 mois essai gratuit' :
      chaine === 'GRATUIT' ? 'GRATUIT' : chaine.split('M')[0] + ' mois';
  }

  public getExpiredDateForfaitFormNow(duration): any {
    return duration == 12 ? moment().add(1, 'y') : moment().add(duration, 'M');
  }

  selectInvAll(event: any[]): void {
    this.groupes = event;
  }

  selectOne(event): void {
    if (this.groupes.find((elt) => elt.id === event.id))
      this.groupes.find((elt) => elt.id === event.id).selected = event.selected;
  }

  onChangeGroupMode(): void {
    // Change mode of group user to be stripped
    const ids = this.groupes.filter((elt: GroupeModele) => elt.selected).map((data: GroupeModele) => data.id);
    this._groupeService.changeModeGroupStripped(ids)
      .subscribe((res: any) => {
        this._customAlertService.toastAlert(res.message, 'toast-top-right', 'success');
        this.allGroupsNoStripped();
      }, err => {
        this._customAlertService.toastAlert('Impossible de changer le mode de ces utilisateurs', 'toast-top-right', 'success');
      })
  }

  isValidChecked(): boolean {
    const data = this.groupes.filter((elt: GroupeModele) => elt.selected)
    return data.length > 0
  }
}
