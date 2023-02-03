import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {InventaireService} from '../../shared/service/inventaire.service';
import {fallIn, moveInUp} from '../../../../router.animations';

import {AppService} from '../../../../app.service';
import {Router} from '@angular/router';
import {Inventaire} from '../../shared/model/inventaire.interface';
import {CustomAlertService} from '../../../../customAlertService.service';
import {InventaireSerializer} from "../../shared/serializer/inventaire.serializer";
import {ColumnInterface} from "../../../../custom-table/shared/modele/column.interface";

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
  sortBy = 'id';
  sortDesc = true;
  perPage = 20;

  currentPage = 1;
  totalItems = 0;

  nameEspece = '';
  totalDatas = 0;

  selectAllStatus = false;

  columns: ColumnInterface [] = [
    {name: 'check', isCheck: true, style: 'min-width: 8rem', isModelProperty: false, isVisible: true},
    {name: 'type', display: 'Type', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
    {name: 'genre', display: 'Genre', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
    {name: 'espece', display: 'Espèce', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
    {name: 'cultivar', display: 'Cultivar', style: 'min-width: 8rem', isModelProperty: true, isVisible: true},
    {name: 'countSubject', display: 'Nb de sujets', style: 'min-width: 4rem', isModelProperty: true, isVisible: true},
    {name: 'hauteur', display: 'Hauteur', style: 'min-width: 5rem', isModelProperty: true, isVisible: true},
    {name: 'diametre', display: 'Diamètre', style: 'min-width: 3rem', isModelProperty: true, isVisible: true},
    {name: 'address', display: 'Adresse', style: 'min-width: 16rem', isModelProperty: true, isVisible: true},
    {name: 'ville', display: 'ville', style: 'min-width: 14rem', isModelProperty: true, isVisible: true},
    {name: 'codeSite', display: 'Code Site', style: 'min-width: 6rem', isModelProperty: true, isVisible: true},
    {name: 'numSujet', display: 'Identification', style: 'min-width: 2.5rem', isModelProperty: true, isVisible: true},
    {
      name: 'createdAt',
      display: 'Date inventaire initial',
      style: 'min-width: 1.5rem',
      isDate: true,
      isModelProperty: true,
      isVisible: true
    },
    {
      name: 'updatedAt',
      isDate: true,
      display: 'Dernière intervention',
      isModelProperty: true,
      style: 'min-width: 1.5rem',
      isVisible: true
    },
    {
      name: 'username',
      display: 'Recenseur',
      style: 'min-width: 0.5rem',
      isModelProperty: true,
      isVisible: true
    }
  ]

  // END DATA TABLE
  constructor(private inventaireService: InventaireService,
              public appService: AppService,
              private router: Router,
              private customAlertService: CustomAlertService) {
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

    this.sort(data);
    this.datas = this.paginate(data);
  }

  lists() {
    this.visibleSpinner = true;
    this.inventaireService.getInventaireNotFinished()
      .subscribe((data: Inventaire[]) => {
        this.visibleSpinner = false;
        this.originalDatas = InventaireService.setDateInitTravaux(InventaireSerializer.arrayInventaireListoJson(data));
        this.update(this.nameEspece);
        this.totalDatas = this.originalDatas.length;
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
      this.inventaireService.validInventaireIsFinished(inventaireSelected)
        .subscribe(() => {
          this.lists();
          this.customAlertService.toastAlert('Inventaire validé avec succès', 'toast-top-right', 'success');
        }, () => {
          this.customAlertService.toastAlert("Erreur lors de la suppression", 'toast-top-center', 'error');
        });
    } else {
      this.customAlertService.toastAlert("Aucun element n'a ete selectionner", 'toast-top-center', 'error');
    }
  }

  isDeletedInv(event: boolean): void {
    if (event) this.lists();
  }


  show(id) {
    this.router.navigate([`/admin/inventaires/${id}`]);
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

  sort(data) {
    data.sort((a: any, b: any) => {
      a = typeof (a[this.sortBy]) === 'string' ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      b = typeof (b[this.sortBy]) === 'string' ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (a < b) {
        return this.sortDesc ? 1 : -1;
      }
      if (a > b) {
        return this.sortDesc ? -1 : 1;
      }
      return 0;
    });
  }

  paginate(data) {
    const perPage = parseInt(String(this.perPage), 10);
    const offset = (this.currentPage - 1) * perPage;

    return data.slice(offset, offset + perPage);
  }

  setSort(key) {
    if (this.sortBy !== key) {
      this.sortBy = key;
      this.sortDesc = false;
    } else {
      this.sortDesc = !this.sortDesc;
    }
    this.currentPage = 1;
    this.update();
  }
}
