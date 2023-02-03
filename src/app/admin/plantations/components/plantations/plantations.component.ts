import { Component, OnInit } from '@angular/core';
import { Plantation } from "../../shared/model/plantation.interface";
import { PlantationService } from "../../shared/service/plantation.service";

import { fallIn, moveInUp } from '../../../../router.animations';
import { CustomAlertService } from "../../../../customAlertService.service";
import { Coordinate } from "../../../inventaires/shared/model/inventaire.interface";
import { ErrorMessage, SuccessMessage } from "../../../../shared/modele/error.interface";
import { AppService } from "../../../../app.service";
import { Router } from "@angular/router";
import { AuthService } from '../../../../shared/service/auth.service';
import { ExcelService } from "../../../gestion-travaux/shared/service/excel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlantationsSerializer } from "../../shared/serializer/plantations.serializer";
import { ArbreService } from "../../../inventaires/shared/service/arbre.service";
import { EcheanceDateService } from "../../../inventaires/shared/service/echeance-date.service";
import { ColumnInterface } from "../../../../custom-table/shared/modele/column.interface";

const now = new Date();

@Component({
  selector: 'app-plantations',
  templateUrl: './plantations.component.html',
  styleUrls: [
    './plantations.component.scss',
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
    '../../../../../vendor/libs/ngb-timepicker/ngb-timepicker.scss',
    '../../../../../vendor/libs/ngx-color-picker/ngx-color-picker.scss'],
  animations: [moveInUp(), fallIn()]
})
export class PlantationsComponent implements OnInit {

  searchKeys = ['genre', 'address'];
  sortBy = 'id';
  sortDesc = true;
  perPage = 10;

  state: any;

  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  currentPage = 1;
  totalItems = 0;
  // END DATA TABLE
  lat = 46.227638;
  lng = 2.213749000000007;
  zoom = 10;

  list = true;
  visibleSpinner = false;

  originalDatas: any = [];
  datas: any = [];

  coord: Coordinate = {
    lat: null,
    long: null
  };

  selectAllStatus = false;
  nameEspece = '';

  // PICKER
  dateEcheance: string;
  plantGroup: FormGroup;

  columns: ColumnInterface[] = [
    { name: 'check', isCheck: true, style: 'min-width: 10rem', isModelProperty: false, isVisible: true },
    { name: 'type', display: 'Type', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'genre', display: 'Genre', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'name', display: 'Espèce', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'cultivar', display: 'Cultivar', style: 'min-width: 10rem', isModelProperty: true, isVisible: true },
    { name: 'countSubject', display: 'Nb de sujets', style: 'min-width: 5rem', isModelProperty: true, isVisible: true },
    { name: 'hauteur', display: 'Hauteur', style: 'min-width: 5rem', isModelProperty: true, isVisible: true },
    { name: 'diametre', display: 'Diamètre', style: 'min-width: 5rem', isModelProperty: true, isVisible: true },
    { name: 'address', display: 'Adresse', style: 'min-width: 5rem', isModelProperty: true, isVisible: true },
    { name: 'ville', display: 'Ville', style: 'min-width: 14rem', isModelProperty: true, isVisible: true },
    { name: 'dateEcheance', isDate: true, display: 'Date de réalisation', isModelProperty: true, isVisible: true }
  ]

  constructor(
    private plantationService: PlantationService,
    private customAlertService: CustomAlertService,
    private router: Router,
    public appService: AppService,
    private excelService: ExcelService,
    public authService: AuthService,
    private fb: FormBuilder,
    private arbreService: ArbreService,
  ) {
    this.errorMessage = {
      show: false,
      message: ''
    };

    this.successMessage = {
      show: false,
      message: ''
    }
  }

  ngOnInit() {
    this.getPlantations();
    this.initForm();
  }

  initForm() {
    this.plantGroup = this.fb.group({
      'espece': ['', Validators.required],
      'hauteur': ['', [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      'diametre': ['', [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      'dateEcheance': ['', Validators.required],
      'countSubject': [1, Validators.required]
    })
  }

  onAdd() {
    // Echeance date modify && Id
    this.plantGroup.value.dateEcheance = EcheanceDateService.formatToServer(this.plantGroup.value.dateEcheance);
    this.plantGroup.value.coord = this.coord;
    this.visibleSpinner = true;
    this.plantationService.create(this.plantGroup.value)
      .subscribe((res: Plantation) => {
        this.getPlantations();
        this.list = true;
        this.errorMessage.show = false;
        this.successMessage.show = false;
        this.successMessage.message = "Nouvelle plantation ajoutée avec succès";
        this.visibleSpinner = false;
        this.plantGroup.reset();
        this.router.navigate(["admin/inventaires/" + res.inventory]);
      }, () => {
        this.visibleSpinner = false;
        this.visibleSpinner = false;
        this.errorMessage.show = true;
        this.errorMessage.message = "Une erreur est survenu sur le serveur";
      });
  }

  getPlantations() {
    this.visibleSpinner = true;
    this.plantationService.list().subscribe((data: Plantation[]) => {
      this.originalDatas = data;
      this.originalDatas = PlantationService.arrayListPlant(this.originalDatas);
      this.update();
      this.visibleSpinner = false;
    }, () => {
      this.visibleSpinner = false;
    });
  }

  deleteMany() {
    const idSelected = this.originalDatas.filter(plantation => plantation.selected).map(data => data.id);
    if (idSelected.length > 0) {
      this.plantationService.deleteMany(idSelected)
        .subscribe(() => {
          this.getPlantations();
          this.customAlertService.toastAlert('Inventaire supprimé avec succès', 'toast-top-right', 'success');
        }, () => {
          this.customAlertService.toastAlert("Aucun element n'a ete selectionner", 'toast-top-center', 'error');
        })
    } else {
      this.customAlertService.toastAlert("Sélectionner un ou plusieurs plantations avant de supprimer", 'toast-top-center', 'error');
    }
  }

  geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.coord.lat = position.coords.latitude;
        this.coord.long = position.coords.longitude;
        this.zoom = 15
      });
    }
  }

  getCoord(event) {
    this.coord.lat = event.coords.lat;
    this.coord.long = event.coords.lng;
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

  exportAsXLSX(): void {
    // DATE TO EXPORT
    const data = PlantationsSerializer.serializeToExtract(this.datas);
    if (!data) return;
    this.excelService.exportAsExcelFile(data,
      'Dendromap_Nouvelles_plantations_extraction'
    );
  }

  selectInvAll(event: any[]): void {
    this.datas = event;
  }

  selectOne(event): void {
    if (this.originalDatas.find((elt) => elt.id === event.id))
      this.originalDatas.find((elt) => elt.id === event.id).selected = event.selected;
  }

  onChangingMenu(event: boolean) {
    this.list = event
    this.geoLocate();
  }

  show(id) {
    let plantationInventoryId = this.datas.find((elt: any) => elt.id == id).inventory;
    if (plantationInventoryId) {
      this.router.navigate([`admin/inventaires/${plantationInventoryId}`])
    } else {
      this.customAlertService.toastAlert("Aucun inventaire associé", 'toast-center-center', 'error');
    }
  }
}
