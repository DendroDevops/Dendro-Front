import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColumnInterface } from "../../shared/modele/column.interface";
import { Inventaire } from "../../../admin/inventaires/shared/model/inventaire.interface";
import { InventaireSerializer } from "../../../admin/inventaires/shared/serializer/inventaire.serializer";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../../app.service';
import { TravauxInfo } from '../../shared/modele/travauxInfo';

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
  showDetails: boolean;
  @Input() set DATA(value: any[]) {
    if (this.orderByColumn) {
      this.sort(value);
    }
    this._data = value;
  }
  get DATA() {
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
  sortBy = "asc";
  itemsInCurrentPage: any[];

  travauxInfos: TravauxInfo[] = new Array<TravauxInfo>();
  constructor(public appService: AppService, private modalService: NgbModal) {
  }

  ngOnInit() {

  }
  ngOnChanges() {
    this.CreateTravuxList(this.DATA);
  }
  CreateTravuxList(datas: any) {
    for (let s = 0; s < this.COLUMNS.length; s++) {
      if (this.COLUMNS[s].name == "Travaux à réaliser") {
        this.showDetails = true;
        break;
      }
    }
    if (this.showDetails) {
      this.travauxInfos = new Array<TravauxInfo>();
      for (var i = 0; i < datas.length; i++) {
        let t = new TravauxInfo();
        t.abattage = datas[i].abattage;
        t.dateProVisite = datas[i].dateProVisite;
        t.etatSanGeneral = datas[i].etatSanGeneral;
        t.userEditedDateTravaux = datas[i].userEditedDateTravaux;
        t.type= datas[i].type;
        t.statusTravaux= datas[i].statusTravaux;
        t.travauxColletMultiple=datas[i].travauxColletMultiple;
        t.travauxColletOther=datas.travauxColletOther;
        t.travauxTroncMultiple=datas[i].travauxTroncMultiple;
        t.travauxTroncOther=datas[i].travauxTroncOther;
        t.travauxTroncProtection=datas[i].travauxTroncProtection;
        t.travauxHouppierMultiple=datas[i].travauxHouppierMultiple;
        t.travauxHouppierOther=datas[i].travauxHouppierOther;
        t.dateTravaux=datas[i].dateTravaux;
        t.risqueGeneralOther=datas[i].risqueGeneralOther;
        t.travaux=datas[i].travaux;
        t.travauxSoin=datas[i].travauxSoin;
        t.travauxProtection=datas[i].travauxProtection;
        t.travauxOther=datas[i].travauxOther;
        this.travauxInfos.push(t);
      };
    }

  }

  visibleIndex = -1;
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
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
    this.itemsInCurrentPage = this.DATA.slice(this.sliceStart, this.sliceEnd);
    for (let d of this.itemsInCurrentPage) {
      d.selected = !d.selected;
    }
    this.selectAll.emit(this.itemsInCurrentPage);

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

  reducer(accumulator: number, item: number) {
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
  sort(data: any[]) {
    data.sort((a: any, b: any) => {
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
          orderResults.push(this.orderNumber(a[key] ? a[key] : 0, b[key] ? b[key] : 0, c.sortBy))
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
  orderNumber(a: number, b: number, sortBy: string) {
    if (!a) a = 0;
    if (!b) b = 0;
    if (sortBy === 'asc') {
      return a - b;
    } else {
      return b - a;
    }
  }
  orderDate(a: Date, b: Date, sortBy: string) {
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
  isTree(type: string,index:any): boolean {
    console.log(type,index)
    console.log(this.DATA[index]);
    console.log(this.travauxInfos[index]);
    return (type.toUpperCase() === 'ARBRE') || (type.toUpperCase() === 'ALIGNEMENT');
  }
}
