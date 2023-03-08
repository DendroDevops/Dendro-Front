import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";
import { fallIn, moveInUp } from '../../../../router.animations';
import { MapService } from '../../../../shared/service/map.service';
import { UserService } from '../../../gestion-droits/shared/service/user.service';
import { Inventaire } from "../../shared/model/inventaire.interface";
import { InventaireSerializer } from "../../shared/serializer/inventaire.serializer";
import { InventaireService } from '../../shared/service/inventaire.service';

@Component({
  selector: 'app-inventaires',
  templateUrl: './inventaires.component.html',
  styleUrls: [
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss',
    './inventaires.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class InventairesComponent implements OnInit {
  list = true;
  visibleSpinner = false;
  state: any;
  // DATA TABLE
  datas: any = [];
  originalDatas: any = [];
  inventaires: any[] = [];

  searchKeys = ['address', 'genre'];
  perPage = 20;
  currentPage = 1;
  totalItems = 0;
  totalDatas = 0;

  searchText: string;
  nameEspece = '';

  selectAllStatus = false;
  SelctedDatas: any = [];
  columns: ColumnInterface[] = [
    { name: 'check', isCheck: true, style: {}, isModelProperty: false, isVisible: true },
    { name: 'type', display: 'Type', style: {"min-width": "4rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'genre', display: 'Genre', style: {"min-width": "4rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'espece', display: 'Espèce', style: {"min-width": "4rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'cultivar', display: 'Cultivar', style: {"min-width": "8rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'countSubject', display: 'Nb de sujets', style: {"min-width": "4rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true },
    { name: 'hauteur', display: 'Hauteur', style: {"min-width": "2rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true },
    { name: 'diametre', display: 'Diamètre', style: {"min-width": "2rem"}, isModelProperty: true, isVisible: true, isSort: true, isNumber: true },
    { name: 'address', display: 'Adresse', style: {"min-width": "16rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'ville', display: 'Ville', style: {"min-width": "14rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'pays', display: 'Pays', style: {"min-width": "2rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'codeSite', display: 'Code Site', style: {"min-width": "0.5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    { name: 'numSujet', display: 'Identification', style: {"min-width": "0.5rem"}, isModelProperty: true, isVisible: true, isSort: true, isString: true },
    {
      name: 'createdAt',
      display: 'Date inventaire initial',
      style: {"min-width": "0.5rem"},
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
      style: {"min-width": "0.5rem"},
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
  ];

  // END DATA TABLE
  constructor(private _inventaireService: InventaireService,
    private _inventaireSerializer: InventaireSerializer,
    private _userService: UserService,
    private _appService: AppService,
    private _router: Router
  ) {
    this._appService.pageTitle = 'Inventaires';
  }

  ngOnInit() {
    this.lists();
  }

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
    this._inventaireService.getInventaireFinished().subscribe((data: Inventaire[]) => {
      this.visibleSpinner = false;
      this.inventaires = data;
      this.originalDatas = InventaireSerializer.arrayInventaireListoJson(data);
      this.datas = this.originalDatas;
      this.totalItems = this.originalDatas.length;
    }, () => {
      this.visibleSpinner = false;
    })
  }

  show(id) {
    this._router.navigate([`/admin/inventaires/${id}`]);
  }

  selectInvAll(event: any[]): void {
    this.SelctedDatas = event;
  }

  selectOne(event): void {
    if (this.originalDatas.find((elt) => elt.id === event.id))
      this.originalDatas.find((elt) => elt.id === event.id).selected = event.selected;
  }

  isDeletedInv(event: boolean): void {
    if (event) this.lists();
  }

  filter(data) {
    const filter = this.nameEspece;
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

  selectedInventaires(): any[] {
    return Array.from(this.originalDatas)
      .filter((elt: any) => elt.selected);
  }

  async printInventaires() {
    let selectedInventaires: Inventaire[] = [];
    let selectedInventairesIds = this.selectedInventaires()
      .map((elm: any) => elm.id);
    for (let idx = 0; idx < selectedInventairesIds.length; idx++) {
      const inventaireId = selectedInventairesIds[idx];
      let data = this.inventaires.find((elt) => elt.id === inventaireId);
      data = this._inventaireSerializer.fromJson(InventaireService.checkOtherInventory(data));
      data = InventaireService.concatOtherInventory(data);
      if (data.arbre) {
        data.arbre.risque = data.arbre.risque && this._inventaireService.transformRisqueRupture(data.arbre.risque);
      } else {
        // GET MOST VALUE ESSENCE
        this._inventaireService.destroyMostValue();
        data.epaysage.coord = MapService.factoryCoordPolygon(data.epaysage.coord);
      }
      let user = await this._userService.read(data.user.id).toPromise();
      data.user = user;
      selectedInventaires.push(data);
    }
    this._inventaireService.stockInventairesToPrint(selectedInventaires);
    this._router.navigate([`/admin/print-inventaires`]).then(() => {
    });
  }

}
