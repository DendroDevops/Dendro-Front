import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { CustomAlertService } from '../../../../customAlertService.service';
import { fallIn, moveInUp } from '../../../../router.animations';
import { Inventaire } from '../../shared/model/inventaire.interface';
import { InventaireSerializer } from "../../shared/serializer/inventaire.serializer";
import { InventaireService } from '../../shared/service/inventaire.service';

@Component({
  selector: 'app-saisie-valide',
  templateUrl: './saisie-valide.component.html',
  styleUrls: [
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    './saisie-valide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class SaisieValideComponent implements OnInit {

  state: any;
  visibleSpinner = false;

  // DATA TABLE
  datas: any = [];
  originalDatas: any = [];

  droits: any = [];
  searchKeys = ['address', 'genre'];
  perPage = 20;

  currentPage = 1;
  totalItems = 0;

  nameEspece = '';
  totalDatas = 0;

  selectAllStatus = false;

  columns: ColumnInterface [] = [
    {name: 'check', isCheck: true, isModelProperty: false, isVisible: true},
    {name: 'type', display: 'Type', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'genre', display: 'Genre', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'espece', display: 'Espèce', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'cultivar', display: 'Cultivar', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'countSubject', display: 'Nb de sujets', style: {"min-width": "4rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
    {name: 'hauteur', display: 'Hauteur', style: {"min-width": "5rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
    {name: 'diametre', display: 'Diamètre', style: {"min-width": "3rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true},
    {name: 'address', display: 'Adresse', style: {"min-width": "16rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'ville', display: 'Ville', style: {"min-width": "14rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'pays', display: 'Pays', style: {"min-width": "2rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    {name: 'codeSite', display: 'Code Site', style: {"min-width": "6rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {name: 'numSujet', display: 'Identification', style: {"min-width": "2.5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true},
    {
      name: 'createdAt',
      display: 'Date inventaire initial',
      style: {"min-width": "1.5rem"},
      isDate: true,
      isModelProperty: true,
      isVisible: true,
      isSort: true
    },
    {
      name: 'updatedAt',
      isDate: true,
      display: 'Dernière intervention',
      isModelProperty: true,
      style: {"min-width": "1.5rem"},
      isVisible: true,
      isSort: true
    },
    {
      name: 'username',
      display: 'Recenseur',
      style: {"min-width": "0.5rem"},
      isModelProperty: true,
      isVisible: true,
      isSort: true,
      isString: true
    }
  ]

  // END DATA TABLE
  constructor(private _inventaireService: InventaireService,
              public appService: AppService,
              private _router: Router,
              private _customAlertService: CustomAlertService) {
    this.appService.pageTitle = 'Saisie à Valider'
  }

  ngOnInit() {
    this.lists();
  }

  // DATA TABLE
  get totalPages() {
    return Math.ceil(this.totalItems / this.perPage);
  }

  update(event: string = '') {
    this.nameEspece = event;
    const data = this.filter(this.originalDatas);
    this.totalItems = data.length;
    this.datas = data;
  }

  lists() {
    this.visibleSpinner = true;
    this._inventaireService.getInventaireNotFinished()
      .subscribe((data: Inventaire[]) => {
        this.visibleSpinner = false;
        this.originalDatas = InventaireService.setDateInitTravaux(InventaireSerializer.arrayInventaireListoJson(data));
        this.datas = this.originalDatas;
        this.totalItems = this.originalDatas.length;
        console.log(this.originalDatas);
      }, () => {
        this.visibleSpinner = true;
      });
  }

  selectInvAll(event: any[]): void {
    this.datas = event;
  }

  selectOne(event): void {
    if (this.originalDatas.find((elt) => elt.id === event.id))
      this.originalDatas.find((elt) => elt.id === event.id).selected = event.selected;
  }

  validInventaire() {
    let inventaireSelected = this.originalDatas.filter(inv => inv.selected).map(data => data.id);
    inventaireSelected = Array.from(new Set(inventaireSelected));

    if (inventaireSelected.length > 0) {
      this._inventaireService.validInventaireIsFinished(inventaireSelected)
        .subscribe(() => {
          this.lists();
          this._customAlertService.toastAlert('Inventaire validé avec succès', 'toast-top-right', 'success');
        }, () => {
          this._customAlertService.toastAlert("Erreur lors de la suppression", 'toast-top-center', 'error');
        });
    } else {
      this._customAlertService.toastAlert("Aucun element n'a ete selectionner", 'toast-top-center', 'error');
    }
  }

  isDeletedInv(event: boolean): void {
    if (event) this.lists();
  }


  show(id) {
    this._router.navigate([`/admin/inventaires/${id}`]);
  }

  filter(data) {
    const filter = this.nameEspece.toLowerCase();
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
