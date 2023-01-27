import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../../app.service';
import {InventaireService} from '../../../inventaires/shared/service/inventaire.service';
import {ActivatedRoute} from '@angular/router';

import {fallIn, moveInUp} from '../../../../router.animations';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {ControlService} from '../../../../shared/service/control.service';
import {CustomAlertService} from '../../../../customAlertService.service';
import {EspeceService} from "../../shared/service/espece.service";
import {Espece} from "../../shared/model/espece.interface";


@Component({
  selector: 'app-detail-espece',
  templateUrl: './detail-espece.component.html',
  styleUrls: ['../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    './detail-espece.component.scss', '../../../../../vendor/libs/spinkit/spinkit.scss'],
  animations: [moveInUp(), fallIn()],
  encapsulation: ViewEncapsulation.None,
})
export class DetailEspeceComponent implements OnInit {

  state: any;
  visibleSpinner = true;
  espece: Espece = {
    id: 0,
    name: '',
    cultivar: '',
    genre: '',
    nomFr: '',
    categorie: '',
    tarif: 0
  }

  name: string;
  showErrorName = false;
  errorName: String = '';

  categorie: string;
  showErrorCategorie = false;
  errorCategorie: String = '';

  genre: string;
  showErrorGenre = false;
  errorGenre: String = '';

  tarif: string;
  showErrorTarif = false;
  errorTarif: String = '';

  // CROPPER
  cropperSettings: CropperSettings;
  data: any;
  fileSelected: any;

  @ViewChild('cropper', /* TODO: add static flag */ undefined)
  cropper: ImageCropperComponent;

  constructor(
    public appService: AppService,
    private inventaireService: InventaireService,
    private activedRoute: ActivatedRoute,
    private controlService: ControlService,
    private customAlertService: CustomAlertService,
    private especeService: EspeceService) {

    this.appService.pageTitle = 'Detail Espece';

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.data = {};
  }

  ngOnInit() {
    this.getOneEspece();
  }

  onControlName() {
    let error = false;
    if (this.controlService.isEmpty(this.espece.name)) {
      this.showErrorName = true;
      this.errorName = 'Champs obligatoire';
      error = true;
    } else {
      this.showErrorName = false;
      this.errorName = '';
      error = false;
    }
    return error;
  }

  onControlCategorie() {
    let error = false;
    if (this.controlService.isEmpty(this.espece.categorie)) {
      this.showErrorCategorie = true;
      this.errorCategorie = 'Champs obligatoire';
      error = true;
    } else {
      this.showErrorCategorie = false;
      this.errorCategorie = '';
      error = false;
    }
    return error;
  }

  onControlTarif() {
    let error = false;

    if (!this.controlService.isEmpty(this.tarif)) {
      if (!this.controlService.filterFloat(this.tarif)) {
        this.showErrorTarif = true;
        this.errorTarif = 'Saisir un entier valide';
        error = true;
      } else {
        this.showErrorTarif = false;
        this.errorTarif = '';
        error = false;
      }
    }
    return error;
  }

  modifier() {
    this.visibleSpinner = true;
    if (!this.onControlName() && !this.onControlCategorie() && !this.onControlGenre() && !this.onControlTarif()) {
      this.especeService.update(this.espece)
        .subscribe((data: any) => {
          this.visibleSpinner = false;
          this.customAlertService.toastAlert(data.message, 'toast-top-right', 'success');
          this.appService.goBack();
        }, err => {
          this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
        });
    }
  }

  onControlGenre() {
    let error = false;
    if (this.controlService.isEmpty(this.espece.genre)) {
      this.showErrorGenre = true;
      this.errorGenre = 'Champs obligatoire';
      error = true;
    } else {
      this.showErrorGenre = false;
      this.errorGenre = '';
      error = false;
    }
    return error;
  }

  getOneEspece() {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.especeService.read(parseInt(id))
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this.espece = data;
      }, () => {
      });
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    this.fileSelected = file;
  }

}
