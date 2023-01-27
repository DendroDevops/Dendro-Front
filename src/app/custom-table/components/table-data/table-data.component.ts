import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {ColumnInterface} from "../../shared/modele/column.interface";
import {Inventaire} from "../../../admin/inventaires/shared/model/inventaire.interface";
import {InventaireSerializer} from "../../../admin/inventaires/shared/serializer/inventaire.serializer";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: [
    './table-data.component.scss',
    '../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss'
  ]
})
export class TableDataComponent implements OnInit {

  private _data: any[] = [];

  @Input() COLUMNS: ColumnInterface[] = []
  @Input() set DATA(value: any[]){
    if (this.orderByColumn) {
      this.sort(value);
    }
    this._data = value;
  }
  get DATA(){
    return this._data;
  }
  @Input() editable: boolean = false;
  @Input() deletable: boolean = false;
  @Input() showAble: boolean = false;
  @Input() sliceStart: number = 0;
  @Input() sliceEnd: number = 10;

  @Output() editClick = new EventEmitter<Number>();
  @Output() deleteClick = new EventEmitter<Number>();
  @Output() showClick: EventEmitter<Number> = new EventEmitter<Number>();
  @Input() selectAllStatus: boolean = false;

  @Output() selectAll = new EventEmitter<any[]>();
  @Output() selectOne = new EventEmitter<any>();

  @Input() isDblClick: boolean = true;
  @Output() dbclick = new EventEmitter<Number>();

  orderByColumns = new Map();
  orderByColumn = "";
  sortBy= "asc";

  constructor(public appService: AppService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  delete(id) {
    this.deleteClick.emit(id);
  }

  edit(id: number) {
    this.editClick.emit(id)
  }
    /**
   * Event to handle detail record
   * @return void
   * @param id
   */
     show(id: number): void {
      this.showClick.emit(id);
    }

  selectInvAll(): void {
    this.selectAllStatus = !this.selectAllStatus
    for (let d of this.DATA) {
      d.selected = !d.selected;
    }
    this.selectAll.emit(this.DATA);
  }

  checkOne(data: any): void {
    Object.keys(data).find((elt) => {
      if (elt == 'selected') data.selected = !data.selected;
    });
    this.selectOne.emit(data);
  }

  details(id: number) {
    this.dbclick.emit(id);
  }
  openModal(data: any, modal: Pick<ColumnInterface, "modalComponent" | "modalTitle">) {
    const modalRef = this.modalService.open(modal.modalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.title = modal.modalTitle;
  }

  reducer(accumulator: number, item: number){
    return accumulator || item;
  };
  filter(cIdx: number, sortBy: string) {
    if (this.COLUMNS.length > 0) {
      this.sortBy = sortBy;
      this.COLUMNS[cIdx].sortBy = this.sortBy;
      this.orderByColumn = this.COLUMNS[cIdx].name;
      this.orderByColumns.clear();
      this.orderByColumns.set(this.COLUMNS[cIdx].name, this.COLUMNS[cIdx]);
      this.sort(this.DATA)
    }
  }
  sort(data: any[]){
    data.sort((a: any, b:  any) => {
      let orderResults = []
      this.orderByColumns.forEach((c: ColumnInterface, key: string) => {
        if (c.isModelProperty && c.isString && !c.isDate && !c.isObject && !c.isCurrency) {
          orderResults.push(this.orderString(a[key], b[key], c.sortBy))
          return;
        }
        if (c.isModelProperty && c.isNumber && !c.isDate && !c.isObject && !c.isCurrency) {
          orderResults.push(this.orderNumber(a[key], b[key], c.sortBy));
          return;
        }
        if (c.isComplex && c.isString) {
          let strA = c.tdValue(a);
          let strB = c.tdValue(b);
          orderResults.push(this.orderString(strA && strB && strA, strB && strA && strB, c.sortBy));
          return;
        }
        if (c.isDate && c.isObject) {
          orderResults.push(this.orderDate(a[c.objectName] && b[c.objectName] && a[c.objectName][c.name], b[c.objectName] && a[c.objectName] && b[c.objectName][c.name], c.sortBy));
          return;
        }
        if (c.isDate && !c.isObject) {
          orderResults.push(this.orderDate(a[c.name], b[c.name], c.sortBy));
          return;
        }
        if (c.isObject && !c.isDate) {
          orderResults.push(this.orderString(a[c.objectName] && b[c.objectName] && a[c.objectName][c.name], b[c.objectName][c.name], c.sortBy));
          return;
        }
        if (c.isCurrency) {
          orderResults.push(this.orderNumber(a[key] ? a[key]: 0, b[key] ? b[key] : 0, c.sortBy))
          return;
        }
      })
      return orderResults.reduce(this.reducer, 0);
    })
  }
  orderString(a: string, b: string, sortBy: string) {
    if (!a) a = "";
    if (!b) b = "";
    if (sortBy === 'asc') {
      return a.toUpperCase().localeCompare(b.toUpperCase());
    } else {
      return b.toUpperCase().localeCompare(a.toUpperCase());
    }
  }
  orderNumber(a: number, b: number, sortBy: string){
    if (!a) a = 0;
    if (!b) b = 0;
    if (sortBy === 'asc') {
      return a-b;
    } else {
      return b-a;
    }
  }
  orderDate(a: Date, b: Date, sortBy: string){
    if (!a) a = new Date();
    if (!b) b = new Date();
    if (sortBy === 'asc') {
      return (new Date(a)).getTime() - (new Date(b)).getTime();
    } else {
      return (new Date(b)).getTime() - (new Date(a)).getTime();
    }
  }

  isVentoryStyle(data: Inventaire): string {
    if (Object.keys(data).find((elt: string) => elt == 'type')) {
      return (!InventaireSerializer.isEB(data.type)) ? 'arbre-style' : 'epaysage-style';
    }
  }
}