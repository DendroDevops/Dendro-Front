import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnInterface} from "../../shared/modele/column.interface";
import {Inventaire} from "../../../admin/inventaires/shared/model/inventaire.interface";
import {InventaireSerializer} from "../../../admin/inventaires/shared/serializer/inventaire.serializer";

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: [
    './table-data.component.scss',
    '../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss'
  ]
})
export class TableDataComponent implements OnInit {

  @Input() COLUMNS: ColumnInterface[] = []
  @Input() DATA: any[] = [];
  @Input() editable: boolean = false;
  @Input() deletable: boolean = false;

  @Output() editClick = new EventEmitter<Number>();
  @Output() deleteClick = new EventEmitter<Number>();
  @Input() selectAllStatus: boolean = false;

  @Output() selectAll = new EventEmitter<any[]>();
  @Output() selectOne = new EventEmitter<any>();

  @Input() isDblClick: boolean = true;
  @Output() dbclick = new EventEmitter<Number>();

  constructor() {
  }

  ngOnInit() {
  }

  delete(id) {
    this.deleteClick.emit(id);
  }

  edit(id: number) {
    this.editClick.emit(id)
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
      return (!InventaireSerializer.isEB(data.type)) ? 'arbre-style' : 'epaysage-style';
    }
  }
}
