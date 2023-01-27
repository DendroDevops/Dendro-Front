import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnInterface} from "../../shared/modele/column.interface";
import {Inventaire} from "../../../admin/inventaires/shared/model/inventaire.interface";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailWorkComponent} from "../detail-work/detail-work.component";

@Component({
  selector: 'app-custom-table-work',
  templateUrl: './custom-table-work.component.html',
  styleUrls: ['./custom-table-work.component.scss']
})
export class CustomTableWorkComponent implements OnInit {

  @Input() COLUMNS: ColumnInterface[] = []
  @Input() DATA: any[] = [];
  @Input() selectAllStatus: boolean = false;

  @Output() selectAll: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() selectOne: EventEmitter<any> = new EventEmitter<any>();
  @Output() editClick: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() showClick: EventEmitter<Number> = new EventEmitter<Number>();

  @Output() deleteClick: EventEmitter<Number> = new EventEmitter<Number>();
  @Input() isDblClick: boolean = true;
  @Output() dbclick: EventEmitter<Number> = new EventEmitter<Number>();

  @Input() editable: boolean = false;
  @Input() deletable: boolean = false;
  @Input() showAble: boolean = false;

  @Input() titleModal: string;
  @Input() sortDesc: boolean;

  @Input() sliceStart: number = 0;
  @Input() sliceEnd: number = 10;

  @Output() sortClick: EventEmitter<string> = new EventEmitter<string>();

  orderByColumns = new Map();
  orderByColumn = "";
  sortBy= "asc";

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
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

  isVentoryStyle(data: Inventaire): string {
    if (Object.keys(data).find((elt: string) => elt == 'type')) {
      return data.type.toUpperCase() == 'ARBRE' ? 'arbre-style' : 'epaysage-style';
    }
  }

  delete(id) {
    this.deleteClick.emit(id);
  }

  /**
   * Event to handle Button edit in the table
   * @return void
   * @param id:Number
   */
  edit(id: number): void {
    this.editClick.emit(id);
  }

  /**
   * Event to handle detail record
   * @return void
   * @param id
   */
  show(id: number): void {
    this.showClick.emit(id);
  }

  openModal(data: any, modal: Pick<ColumnInterface, "modalComponent" | "modalTitle">) {
    const modalRef = this.modalService.open(modal.modalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.title = modal.modalTitle;
  }

  setSort(event: string) {
    this.sortDesc = !this.sortDesc;
    this.sortClick.emit(event);
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

      this.DATA.sort((a: any, b:  any) => {
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
          if (c.isDate) {
            orderResults.push(this.orderDate(a[key], b[key], c.sortBy));
            return;
          }
          if (c.isObject) {
            a[key] && b[key] && orderResults.push(this.orderString(a[c.name][c.objectName], b[c.name][c.objectName], c.sortBy));
            return;
          }
          if (c.isCurrency) {
            a[key] && b[key] && orderResults.push(this.orderNumber(a[key], b[key], c.sortBy))
            return;
          }
        })
        return orderResults.reduce(this.reducer, 0);
      })
    }
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
}
