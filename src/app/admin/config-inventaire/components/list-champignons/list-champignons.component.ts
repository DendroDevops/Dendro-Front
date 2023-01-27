import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { CustomAlertService } from "../../../../customAlertService.service";
import { Champignons } from "../../shared/model/Champignons";
import { ChampignonsService } from "../../shared/service/champignons.service";

@Component({
  selector: 'app-list-champignons',
  templateUrl: './list-champignons.component.html',
  styleUrls: ['./list-champignons.component.scss']
})
export class ListChampignonsComponent implements OnInit {

  perPage = 20;
  currentPage = 1;
  totalItems = 0;
  searchKeys = ['id', 'name'];

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  // DATA TABLE
  filterVal: string = '';
  champignonsList: Champignons[] = [];
  originalDatas: any[] = [];

  columns: ColumnInterface[] = [
    { name: 'name', display: 'Champignon', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'attaqueR', display: 'Attaque Résineux', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'attaqueF', display: 'Attaque Feuillu', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'category', display: 'Catégorie', style: {"min-width": "10rem"},thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'createdAt', isDate: true, display: 'Date création',thClass: "text-center", isModelProperty: true, isVisible: true, isSort: true },
    { name: 'actions', style: '', isModelProperty: false, isVisible: true }
  ]

  constructor(
    private _customAlertService: CustomAlertService,
    private _champignonsService: ChampignonsService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.lists()
  }

  lists() {
    this.visibleSpinner.emit(true);
    this._champignonsService.list()
      .subscribe((result: Champignons[]) => {
        this.visibleSpinner.emit(false);
        this.originalDatas = result;
        this.champignonsList = result;
        this.totalItems = this.originalDatas.length;
      }, err => {
        this.visibleSpinner.emit(true);
      });
  }

  show(id) {
    // SHOW DETAIL CHAMPIGNONS
    this._router.navigate([`admin/config-inventaire/champignons/${id}`])
  }

  delete(id) {
    this.visibleSpinner.emit(true);
    this._champignonsService.delete(id)
      .subscribe(() => {
        this._customAlertService.toastAlert('Suppression effectuée', 'toast-top-right', 'success');
        this.champignonsList = this.champignonsList.filter((elt: Champignons) => elt.id !== id);
        this.list.emit(true);
        this.visibleSpinner.emit(false);
      }, err => {
        this.visibleSpinner.emit(false);
        this._customAlertService.toastAlert(err, 'toast-top-right', 'error');
      })
  }

   update(event: string = '') {
    this.filterVal = event;
    const data = this.filter(this.originalDatas);
    this.totalItems = data.length;
    // this.sort(data);
    this.champignonsList = data;
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
