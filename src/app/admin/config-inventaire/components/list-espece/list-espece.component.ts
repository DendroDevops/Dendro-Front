import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { CustomAlertService } from "../../../../customAlertService.service";
import { Espece } from "../../shared/model/espece.interface";
import { EspeceService } from "../../shared/service/espece.service";

@Component({
  selector: 'app-list-espece',
  templateUrl: './list-espece.component.html',
  styleUrls: ['./list-espece.component.scss']
})
export class ListEspeceComponent implements OnInit {

  perPage = 20;
  currentPage = 1;
  totalItems = 0;
  searchKeys = ['id','genre', 'name', 'cultivar', 'nomFr'];

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  // DATA TABLE
  filterVal: string = '';
  especeList: Espece[];
  originalDatas: any[] = [];
  columns: ColumnInterface[] = [
    {name: 'genre', display: 'Genre', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'name', display: 'Espèce', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'cultivar', display: 'Cultivar', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'nomFr', display: 'Nom français', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'categorie', display: 'Catégorie', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {
      name: 'tarif',
      display: 'Tarif',
      isCurrency: true,
      style: {"min-width": "10rem"},
      thClass: "text-center",
      isModelProperty: true,
      isVisible: true,
      isSort: true
    },
    {name: 'createdAt', isDate: true, display: 'Date de création', thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true},
    {name: 'actions', isModelProperty: false, isVisible: true}
  ];

  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  constructor(
    private _customAlertService: CustomAlertService,
    private _especeService: EspeceService,
    private _router: Router) {
  }

  ngOnInit() {
    this.lists();
  }

  lists() {
    this.visibleSpinner.emit(true);
    this._especeService.list()
      .subscribe((result: Espece[]) => {
        this.visibleSpinner.emit(false);
        this.originalDatas = result;
        this.especeList = result;
        this.totalItems = this.originalDatas.length;
      }, () => {
        this.visibleSpinner.emit(true);
      });
  }


  show(id) {
    this._router.navigate([`admin/config-inventaire/espece/${id}`])
  }

  delete(id) {
    this.visibleSpinner.emit(true);
    this._especeService.delete(id)
      .subscribe(() => {
        this.visibleSpinner.emit(false);
        this._customAlertService.toastAlert('Suppression effectuée', 'toast-top-right', 'success');
        this.especeList = this.especeList.filter(elt => elt.id !== id);
        this.list.emit(true);
      }, err => {
        this.visibleSpinner.emit(false);
        if (err.errorCode == 204) {
          this._customAlertService.toastAlert('Impossible de supprimer cette essence', 'toast-top-right', 'error');
          return;
        }
        this._customAlertService.toastAlert('Erreur lors de la suppression', 'toast-top-right', 'error');
      })
  }
  update(event: string = '') {
    this.filterVal = event;
    const data = this.filter(this.originalDatas);
    this.totalItems = data.length;
    this.especeList = data;
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
