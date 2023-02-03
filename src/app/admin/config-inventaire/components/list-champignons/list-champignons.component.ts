import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResourceListInterface } from "../../../../shared/modele/resourceList.interface";
import { Champignons } from "../../shared/model/Champignons";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { Router } from "@angular/router";
import { ChampignonsService } from "../../shared/service/champignons.service";
import { CustomAlertService } from "../../../../customAlertService.service";

@Component({
  selector: 'app-list-champignons',
  templateUrl: './list-champignons.component.html',
  styleUrls: ['./list-champignons.component.scss']
})
export class ListChampignonsComponent implements OnInit {

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  // DATA TABLE
  filterVal: string = '';
  pageSelect = 1;
  champignonsList: ResourceListInterface<Champignons>;

  columns: ColumnInterface[] = [
    { name: 'name', display: 'Champignon', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'attaqueR', display: 'Attaque Résineux', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'attaqueF', display: 'Attaque Feuillu', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'category', display: 'Catégorie', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'createdAt', isDate: true, display: 'Date création', isModelProperty: true, isVisible: true },
    { name: 'actions', style: '', isModelProperty: false, isVisible: true }
  ]

  constructor(private customAlertService: CustomAlertService,
    private champignonsService: ChampignonsService,
    private router: Router) {
  }

  ngOnInit() {
    this.lists()
  }

  lists() {
    this.visibleSpinner.emit(true);
    this.champignonsService.listPaginate(this.pageSelect)
      .subscribe((result: ResourceListInterface<Champignons>) => {
        this.visibleSpinner.emit(false);
        this.champignonsList = result;
      }, err => {
        this.visibleSpinner.emit(true);
      });
  }

  show(id) {
    // SHOW DETAIL CHAMPIGNONS
    this.router.navigate([`admin/config-inventaire/champignons/${id}`])
  }

  delete(id) {
    this.visibleSpinner.emit(true);
    this.champignonsService.delete(id)
      .subscribe(() => {
        this.customAlertService.toastAlert('Suppression effectuée', 'toast-top-right', 'success');
        this.champignonsList = {
          ...this.champignonsList,
          datas: this.champignonsList.datas.filter((elt: Champignons) => elt.id !== id)
        };
        this.list.emit(true);
        this.visibleSpinner.emit(false);
      }, err => {
        this.visibleSpinner.emit(false);
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      })
  }

  /**
   * @param event : Number
   */
  update(event: number) {
    this.pageSelect = event;
    if (event !== (this.champignonsList.currentPage - 1) && this.filterVal.length === 0) {
      this.lists();
    } else if (event !== (this.champignonsList.currentPage - 1) && this.filterVal.length !== 0) {
      this.search()
    }

  }

  filter(data: string) {
    this.filterVal = data
    this.pageSelect = 1;
    data.length == 0 ? this.lists() : this.search();
  }

  search() {
    this.champignonsService.search(this.pageSelect, this.filterVal)
      .subscribe((result: ResourceListInterface<Champignons>) => {
        this.champignonsList = result;
      }, () => {

      });
  }

}
