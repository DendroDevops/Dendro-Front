import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { fallIn, moveInUp } from '../../../../router.animations';
import { Inventaire } from '../../../inventaires/shared/model/inventaire.interface';
import { InventaireService } from '../../../inventaires/shared/service/inventaire.service';
import { COLUMNS_WORK_CONST } from "../../shared/constant/column-work.cosnt";
import { GestionTravauxService } from "../../shared/service/gestion-travaux.service";

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
  SelctedDatas: any = [];
  // DATA TABLE
  datas: any = [];
  originalDatas: any = [];

  searchKeys = ['address', 'genre'];

  perPage = 20;
  currentPage = 1;
  totalItems = 0;
  // FILTER
  nameEspece = '';
  selectAllStatus = false;
  data: any;
  // END DATA TABLE
  columns: ColumnInterface[] = COLUMNS_WORK_CONST;

  constructor(
    private _appService: AppService,
    private _router: Router,
    private _gestionTravauxService: GestionTravauxService) {
    this._appService.pageTitle = 'Alertes'
  }

  ngOnInit() {
    this.getlistAlertesoftheMonth();
  }

  getlistAlertesoftheMonth() {
    this.visibleSpinner = true;
    this._gestionTravauxService.getAlertInventaire()
      .subscribe((data: Inventaire[]) => {
        this.visibleSpinner = false;
        this.originalDatas = InventaireService.arrayTravauxListJson(data);
        // this.update(this.nameEspece);
        this.datas = this.originalDatas;
        this.totalItems = this.originalDatas.length;
      }, () => {
        this.visibleSpinner = true;
      });
  }

  show(id) {
    this._router.navigate([`/admin/inventaires/${id}`]);
  }

  
  selectInvAll(event: any[]): void {
    this.SelctedDatas = event;
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
    this.datas = data
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
}
