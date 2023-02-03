import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Espece} from "../../shared/model/espece.interface";
import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";
import {AppService} from "../../../../app.service";
import {CustomAlertService} from "../../../../customAlertService.service";
import {EspeceService} from "../../shared/service/espece.service";
import {Router} from "@angular/router";
import {ResourceListInterface} from "../../../../shared/modele/resourceList.interface";

@Component({
  selector: 'app-list-espece',
  templateUrl: './list-espece.component.html',
  styleUrls: ['./list-espece.component.scss']
})
export class ListEspeceComponent implements OnInit {

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  columns: ColumnInterface[] = [
    {name: 'genre', display: 'Genre', style: 'min-width: 10rem', isModelProperty: true, isVisible: true},
    {name: 'name', display: 'Espèce', style: 'min-width: 10rem', isModelProperty: true, isVisible: true},
    {name: 'cultivar', display: 'Cultivar', style: 'min-width: 10rem', isModelProperty: true, isVisible: true},
    {name: 'nomFr', display: 'Nom français', style: 'min-width: 10rem', isModelProperty: true, isVisible: true},
    {name: 'categorie', display: 'Catégorie', style: 'min-width: 10rem', isModelProperty: true, isVisible: true},
    {
      name: 'tarif',
      display: 'Tarif',
      isCurrency: true,
      style: 'min-width: 10rem',
      isModelProperty: true,
      isVisible: true
    },
    {name: 'createdAt', isDate: true, display: 'Date de création', isModelProperty: true, isVisible: true},
    {name: 'actions', isModelProperty: false, isVisible: true}
  ];

  // DATA TABLE
  filterVal: string = '';
  pageSelect = 1;
  especeList: ResourceListInterface<Espece>;

  constructor(private appService: AppService,
              private customAlertService: CustomAlertService,
              private especeService: EspeceService,
              private router: Router) {
  }

  ngOnInit() {
    this.lists();
  }

  lists() {
    this.visibleSpinner.emit(true);
    this.especeService.listPaginate(this.pageSelect)
      .subscribe((result: ResourceListInterface<Espece>) => {
        this.visibleSpinner.emit(false);
        this.especeList = result
      }, () => {
        this.visibleSpinner.emit(true);
      });
  }


  show(id) {
    this.router.navigate([`admin/config-inventaire/espece/${id}`])
  }

  delete(id) {
    this.visibleSpinner.emit(true);
    this.especeService.delete(id)
      .subscribe(() => {
        this.visibleSpinner.emit(false);
        this.customAlertService.toastAlert('Suppression effectuée', 'toast-top-right', 'success');
        this.especeList = {...this.especeList, datas: this.especeList.datas.filter(elt => elt.id !== id)};
        this.list.emit(true);
      }, err => {
        this.visibleSpinner.emit(false);
        if (err.errorCode == 204) {
          this.customAlertService.toastAlert('Impossible de supprimer cette essence', 'toast-top-right', 'error');
          return;
        }
        this.customAlertService.toastAlert('Erreur lors de la suppression', 'toast-top-right', 'error');
      })
  }

  /**
   * @param event : Number
   */
  update(event: number) {
    this.pageSelect = event;
    if (event !== (this.especeList.currentPage - 1) && this.filterVal.length === 0) {
      this.lists();
    } else if (event !== (this.especeList.currentPage - 1) && this.filterVal.length !== 0) {
      this.search()
    }

  }

  filter(data: string) {
    this.filterVal = data;
    this.pageSelect = 1;
    data.length == 0 ? this.lists() : this.search();
  }

  search() {
    this.especeService.search(this.pageSelect, this.filterVal)
      .subscribe((result: ResourceListInterface<Espece>) => {
        this.especeList = result;
      }, () => {

      });
  }

}
