import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms'

import {AppService} from '../../../../app.service';
import {InventaireService} from '../../shared/service/inventaire.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InventoryMapInterface} from "../../shared/model/InventoryMap.interface";
import {MapService} from "../../../../shared/service/map.service";
import {InventaireSerializer} from "../../shared/serializer/inventaire.serializer";

@Component({
  selector: 'app-geo-inventaires',
  templateUrl: './geo-inventaires.component.html',
  styleUrls: ['../../../../../vendor/styles/pages/products.scss', './geo-inventaires.component.scss']
})
export class GeoInventairesComponent implements OnInit {
  lat = 46.227638;
  lng = 2.213749000000007;

  inventairePopUp: InventoryMapInterface;
  fillcolor = '#EC1936';
  eppStroke = '#795548';
  ebcStroke = '#EF6C00';

  zoom: number = 15;

  visibleSpinner = true;
  iconBrouillon = '../../../assets/static/img/Draft.svg';
  iconTermine = '../../../assets/static/img/Original.svg';
  iconEnAlignement = '../../../assets/static/img/EnAlignement.svg';

  datas: InventoryMapInterface[] = [];
  categorie: string;
  especeDatas: any = [];
  // Form Builder
  searchForm: FormGroup;
  position = 'RADIUS';
  urlImage: '../../../assets/m4.php'

  constructor(
    private appService: AppService,
    private inventaireService: InventaireService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private mapService: MapService) {
    this.appService.pageTitle = 'Geo Inventaires';
  }

  async ngOnInit() {
    this.initForm();
    await this.geoLocate();
  }

  initForm() {
    this.searchForm = this.fb.group({
      'espece': [''],
      'codeSite': [''],
      'arbreRemarquable': [''],
      'isFinished': [false],
      'address': ['']
    });
  }

  geoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getInventoryPosition()
      }, (err) => {
        this.getInventoryPosition()
      });
    }
  }

  getInventoryPosition(): void {
    this.visibleSpinner = true;
    this.position = 'RADIUS'
    this.inventaireService.getInventoryByPosition(this.lat, this.lng, this.searchForm.value, this.position)
      .subscribe((result: InventoryMapInterface[]) => {
        this.datas = result;
        this.visibleSpinner = false;
        this.removeDataInventory();
      }, () => {
        this.visibleSpinner = false;
      })
  }


  show(id: Number) {
    this.router.navigate([`/admin/inventaires/${id}`]);
  }

  get dataInventory() {
    return JSON.parse(localStorage.getItem('datasInventaire'));
  }

  removeDataInventory() {
    localStorage.removeItem('datasInventaire');
  }

  async search() {
    this.visibleSpinner = true;
    if (this.searchForm.value.address && (typeof this.searchForm.value.address === 'object')) { // address
      const latLng = await this.mapService.getLatLng(this.searchForm.value.address.place_id);
      if (latLng.lat && latLng.lng) {
        this.lat = latLng.lat;
        this.lng = latLng.lng;
        this.zoom = 15;
      }
      this.visibleSpinner = false;
      // Get all inventory by this position
      this.getInventoryPosition();
      return;
    }

    this.zoom >= 15 ? this.getInventoryPosition() : this.getAllInventory();
  }

  set storeDataInventory(data) {
    localStorage.setItem('datasInventaire', JSON.stringify(data));
  }

  open(content, options = {}, inventaire: InventoryMapInterface) {

    this.inventairePopUp = inventaire;
    this.modalService.open(content, options).result.then(() => {
    }, (reason) => {
    });
  }

  zoomChange(event) {
    this.zoom = event;
    if (this.zoom <= 9) {
      if (!this.dataInventory) {
        this.getAllInventory();
      }
    }
  }

  getAllInventory() {
    this.visibleSpinner = true;
    this.position = 'ALL';
    this.inventaireService.getInventoryByPosition(this.lat, this.lng, this.searchForm.value, this.position)
      .subscribe((result: InventoryMapInterface[]) => {
        this.datas = result;
        this.storeDataInventory = this.datas;
        this.visibleSpinner = false;
      }, () => {
        this.visibleSpinner = false;
      })
  }

  isEssence(type: string): boolean {
    
    return InventaireSerializer.isEB(type);
  }
}
