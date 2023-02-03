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

  @Output() sortClick: EventEmitter<string> = new EventEmitter<string>();

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

  openModal(data) {
    const modalRef = this.modalService.open(DetailWorkComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.title = this.titleModal;
  }

  setSort(event: string) {
    this.sortDesc = !this.sortDesc;
    this.sortClick.emit(event);
  }
}
