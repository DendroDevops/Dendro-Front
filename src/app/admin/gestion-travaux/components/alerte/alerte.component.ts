import {Component, OnInit} from '@angular/core';
import {fallIn, moveInUp} from '../../../../router.animations';
import {AppService} from '../../../../app.service';
import {InventaireService} from '../../../inventaires/shared/service/inventaire.service';
import {Router} from '@angular/router';
import {Inventaire} from '../../../inventaires/shared/model/inventaire.interface';
import {GestionTravauxService} from "../../shared/service/gestion-travaux.service";
import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";
import {COLUMNS_WORK_CONST} from "../../shared/constant/column-work.cosnt";

@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: [
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss',
    './alerte.component.scss'
  ],
  animations: [moveInUp(), fallIn()]
})
export class AlerteComponent implements OnInit {
  state: any;
  visibleSpinner = false;

  // DATA TABLE
  datas: any = [];
  originalDatas: any = [];

  searchKeys = ['address', 'genre'];
  sortBy = 'userEditedDateTravaux';
  sortDesc = false;
  perPage = 20;

  currentPage = 1;
  totalItems = 0;
  // FILTER
  nameEspece = '';
  selectAllStatus = false;
  data: any;
  // END DATA TABLE
  columns: ColumnInterface[] = COLUMNS_WORK_CONST;

  constructor(private inventaireService: InventaireService,
              private appService: AppService,
              private router: Router,
              private gestionTravauxService: GestionTravauxService) {
    this.appService.pageTitle = 'Alertes'
  }

  ngOnInit() {
    this.getlistAlertesoftheMonth();
  }

  getlistAlertesoftheMonth() {
    this.gestionTravauxService.getAlertInventaire()
      .subscribe((data: Inventaire[]) => {
        this.visibleSpinner = false;
        this.originalDatas = InventaireService.arrayTravauxListJson(data);
        this.update(this.nameEspece);
      }, () => {
        this.visibleSpinner = true;
      });
  }

  show(id) {
    this.router.navigate([`/admin/inventaires/${id}`]);
  }

  selectInvAll(event: any[]): void {
    this.datas = event;
  }

  selectOne(event): void {
    if (this.originalDatas.find((elt) => elt.id === event.id))
      this.originalDatas.find((elt) => elt.id === event.id).selected = event.selected;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update(event: string = '') {
    this.nameEspece = event;
    const data = this.filter(this.originalDatas);
    this.totalItems = data.length;

    this.sort(data);
    this.datas = this.paginate(data);
  }

  filter(data) {
    const filter = this.nameEspece;
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

  setSort(key: string) {
    this.sortBy = key;
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
