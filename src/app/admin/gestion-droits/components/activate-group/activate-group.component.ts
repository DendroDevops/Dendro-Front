import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GroupeService} from "../../shared/service/groupe.service";
import {GroupeModele} from "../../shared/model/groupe";
import {fallIn, moveInUp} from "../../../../router.animations";
import {AppService} from "../../../../app.service";
import * as userConst from "../../shared/constant/user.constants";
import * as moment from "moment";
import {CustomAlertService} from "../../../../customAlertService.service";

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
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  filterVal = '';
  currentPage = 1;
  totalItems = 0;

  groupes: GroupeModele[] = [];
  originalGroupes: GroupeModele[] = [];

  visibleSpinner = false;
  groupeTypes = userConst.USER_GROUPE_TYPE;

  selectAllStatus = false;

  constructor(
    public groupeService: GroupeService,
    public appService: AppService,
    private customAlertService: CustomAlertService,
  ) {
  }

  ngOnInit() {
    this.allGroupsNoStripped();
  }

  allGroupsNoStripped() {
    this.visibleSpinner = true;
    this.groupeService.getAllNoStripped()
      .subscribe((res: GroupeModele[]) => {
        this.visibleSpinner = false;
        this.originalGroupes = res;
        this.update();
      }, () => {
      })
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

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update() {
    const data = this.filter(this.originalGroupes);
    this.totalItems = data.length;

    this.sort(data);
    this.groupes = this.paginate(data);
  }

  filter(data): string {
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

  sort(data): void {
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

  public forfaitDuration(chaine: string): string {
    return chaine == '1M_FREE' ? '1 mois essai gratuit' :
      chaine === 'GRATUIT' ? 'GRATUIT' : chaine.split('M')[0] + ' mois';
  }

  public getExpiredDateForfaitFormNow(duration): any {
    return duration == 12 ? moment().add(1, 'y') : moment().add(duration, 'M');
  }

  selectInv(group: GroupeModele) {
    group.selected = !group.selected;

    this.groupes.forEach((dataCurrent: GroupeModele) => {
      if (dataCurrent.id == group.id) {
        dataCurrent.selected = group.selected;
      }
    })
  }

  selectInvAll() {
    if (this.selectAllStatus) {
      this.groupes.forEach((group: GroupeModele) => {
        group.selected = true;
      })
    } else {
      this.groupes.forEach((group: GroupeModele) => {
        group.selected = false;
      })
    }
  }

  onChangeGroupMode(): void {
    // Change mode of group user to be stripped
    const ids = this.groupes.filter((elt: GroupeModele) => elt.selected).map((data: GroupeModele) => data.id);
    this.groupeService.changeModeGroupStripped(ids)
      .subscribe((res: any) => {
        this.customAlertService.toastAlert(res.message, 'toast-top-right', 'success');
        this.allGroupsNoStripped();
      }, err => {
        this.customAlertService.toastAlert('Impossible de changer le mode de ces utilisateurs', 'toast-top-right', 'success');
      })
  }

  isValidChecked(): boolean {
    const data = this.groupes.filter((elt: GroupeModele) => elt.selected)
    return data.length > 0
  }
}
