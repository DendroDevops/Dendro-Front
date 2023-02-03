import {Component, OnInit} from '@angular/core';
import {fallIn, moveInUp} from "../../../../router.animations";
import {Inventaire} from "../../shared/model/inventaire.interface";
import {Essence} from "../../shared/model/essence.interface";
import {EssenceService} from "../../shared/service/essence.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomAlertService} from "../../../../customAlertService.service";
import {InventaireService} from "../../shared/service/inventaire.service";
import {IOption} from "ng-select";
import * as moment from 'moment';

import * as inventoryConst from '../../shared/constant/woodArea.constant';
import {ErrorMessage, SuccessMessage} from "../../../../shared/modele/error.interface";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../environments/environment";
import {AppService} from "../../../../app.service";
import {EcheanceDateService} from "../../shared/service/echeance-date.service";
import {EspeceService} from "../../../config-inventaire/shared/service/espece.service";
import {Espece} from "../../../config-inventaire/shared/model/espece.interface";
import {ChampignonsService} from "../../../config-inventaire/shared/service/champignons.service";
import {Champignons} from "../../../config-inventaire/shared/model/Champignons";
import {NuisibleService} from "../../../config-inventaire/shared/service/nuisible.service";
import {Nuisible} from "../../../config-inventaire/shared/model/nuisible.interface";
import * as bevaConst from '../../shared/constant/beva.const'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BevaService} from "../../shared/service/beva.service";
import {BackButtonUrlService} from "../../shared/service/backButtonUrl.service";

const now = new Date();

@Component({
  selector: 'app-modif-essence',
  templateUrl: './modif-essence.component.html',
  styleUrls: [
    './modif-essence.component.scss',
    '../../../../../vendor/libs/ng2-archwizard/ng2-archwizard.scss',
    '../../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss'],
  animations: [moveInUp(), fallIn()]

})
export class ModifEssenceComponent implements OnInit {
  state: any;
  essence: Essence;
  especeData: any;

  selectOptions: Array<IOption> = [];
  inventaire: Inventaire;

  // OPTIONS PARAMS
  caractOptions: Array<IOption> = [];
  isCaractOther = false;
  stadeDevOptions: Array<IOption> = [];
  houppierOptions: Array<IOption> = [];
  critereOptions: Array<IOption> = [];
  isCritereCom = false;
  isCritereOther = false;
  domaineOptions: Array<IOption> = [];
  nuisanceOptions: Array<IOption> = [];
  proximiteOptions: Array<IOption> = [];
  isProximiteOther = false;
  proximiteWithDictOptions: Array<IOption> = [];
  tauxFreqOptions: IOption[] = [];
  typePassageOptions: IOption[] = [];
  isTypePassageOther = false;
  accessibiliteOptions: IOption[] = [];
  isAccessibiliteOther = false;
  etatGeneralOptions: IOption[] = [];
  isHeathDiagOther = false;
  isHealthDiagChampignons = false;
  isHealthDiagParasite = false;
  isHealthDiagParasiteOther = false;
  etatGeneralChampignonsOptions: any = [];
  etatGeneralParasiteOptions: any = [];

  risqueOptions: IOption[] = [];
  travauxOptions: IOption[] = [];
  isTravauxOther = false;
  isTravauxProtection = false;
  isTravauxSoin = false;

  dateTravauxOptions: IOption[] = [];
  // DATAMODELEOPTIONS
  champignonsOptions: IOption[] = [];
  parasitesOptions: IOption[] = [];
  // TAB EXPORT

  visibleSpinner = false;

  displayMonths = 1;
  navigation = 'select';
  disabled = false;
  dateEcheance: string;

  varietyGradeError: string = '';
  varietyGradeShowError = false;

  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  // uploader
  selectedFile: any;
  urlBaseEssence = environment.baseUrl + 'images/epaysage/essences/';
  uploader = new FileUploader({
    url: '',
    authTokenHeader: 'authorization',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    queueLimit: 1,
    disableMultipart: true,
  });
  hasBaseDropZoneOver = false;

  canvasImgVisible = false;
  positionImg: any = 0;

  rotationImg1: number = null;
  rotationImg2: number = null;
  rotationImg3: number = null;

  current = new Date().getTime();

  location = false;
  isEtatSanChampignonsAutres: boolean = false

  inventoryForm: FormGroup;

  constructor(
    private essenceService: EssenceService,
    private activatedRoute: ActivatedRoute,
    private customAlertService: CustomAlertService,
    private inventaireService: InventaireService,
    private router: Router,
    public appService: AppService,
    private especeService: EspeceService,
    private champignonsService: ChampignonsService,
    private nuisibleService: NuisibleService,
    private fb: FormBuilder,
    private urlService: BackButtonUrlService
  ) {
    this.errorMessage = {
      show: false,
      message: ''
    };

    this.successMessage = {
      show: false,
      message: ''
    };
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.getOneEssence();
    this.autoCompleteSelectOptions();
  }

  initForm() {
    this.inventoryForm = this.fb.group({
      id: [this.essence.id],

      // Identification
      espece: [this.essence.espece.id.toString(), [Validators.required]],
      diametre: [this.essence.diametre, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      hauteur: [this.essence.hauteur, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      area: [this.essence.area, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      codeSite: [this.essence.codeSite],
      numSujet: [this.essence.numSujet],

      // Caracteristiques
      caract: [this.essence.caract],
      caractOther: [this.essence.caractOther],
      stadeDev: [this.essence.stadeDev],
      houppier: [this.essence.houppier],
      critere: [this.essence.critere],
      critereOther: [this.essence.critereOther],

      // Environnement
      domaine: [this.essence.domaine],
      nuisance: [this.essence.nuisance],
      proximite: [this.essence.proximite],
      proximiteOther: [this.essence.proximiteOther],
      proximiteWithDict: [this.essence.proximiteWithDict],
      tauxFreq: [this.essence.tauxFreq],
      typePassage: [this.essence.typePassage],
      typePassageOther: [this.essence.typePassageOther],
      accessibilite: [this.essence.accessibilite],
      accessibiliteOther: [this.essence.accessibiliteOther],

      // Health diag
      etatGeneral: [this.essence.etatGeneral],
      etatSanGeneralChampignonsAutres: [this.essence.etatSanGeneralChampignonsAutres],
      etatSanGeneralChampignons: [this.inventaireService.factoryDataModelOptions(this.essence.etatSanGeneralChampignons, [])],
      etatSanGeneralParasite: [this.inventaireService.factoryDataModelOptions(this.essence.etatSanGeneralParasite, [])],
      etatSanGeneralParasiteAutres: [this.essence.etatSanGeneralParasiteAutres],
      etatSanGeneralOther: [this.essence.etatSanGeneralOther],
      risque: [this.essence.risque],

      // Travaux
      nbreSujetConcerne: [this.essence.nbreSujetConcerne, [Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      travaux: [this.essence.travaux],
      travauxOther: [this.essence.travauxOther],
      travauxSoin: [this.essence.travauxSoin],
      travauxProtection: [this.essence.travauxProtection],
      dateTravaux: [this.essence.dateTravaux ? this.essence.dateTravaux : this.essence.dateProVisite],
      userEditedDateTravaux: [EcheanceDateService.formatDateToModel(this.essence.userEditedDateTravaux)],
      countSubject: [this.essence.countSubject],
      // Beva
      varietyGrade: [this.essence.varietyGrade, []],
      healthIndex: [this.essence.healthIndex],
      locationIndex: [this.essence.locationIndex],
      healthColumn: [this.essence.healthColumn],
      aestheticColumn: [this.essence.aestheticColumn],
      aestheticIndex: [this.essence.aestheticIndex],
      beva: [this.essence.beva]
    });
  }

  initVariables() {
    if (this.inventoryForm.get("caract").value == "other") {
      if (!this.inventoryForm.get("caractOther").value) {
        this.inventoryForm.patchValue({caractOther: null});
        this.inventoryForm.get("caract").patchValue("");
      }
      else this.isCaractOther = true;
    }else this.inventoryForm.patchValue({caractOther: null});
    if (this.inventoryForm.get("critere").value == "other") {
      if (!this.inventoryForm.get("critereOther").value) {
        this.inventoryForm.patchValue({critereOther: null});
        this.inventoryForm.get("critere").patchValue("");
      }
      else this.isCritereOther = true;
    }else this.inventoryForm.patchValue({caractOther: null});
    if (this.inventoryForm.get("proximite").value.length && Array.from(this.inventoryForm.get("proximite").value ).includes('other')) {
      if (!this.inventoryForm.get("proximiteOther").value) {
        this.inventoryForm.patchValue({proximiteOther: null});
        this.inventoryForm.get("proximite").patchValue(Array.from(this.inventoryForm.get("proximite").value).filter(elm => elm != "other"));
      }
      else this.isProximiteOther = true;
    }else this.inventoryForm.patchValue({proximiteOther: null});
    if (this.inventoryForm.get("typePassage").value.length && Array.from(this.inventoryForm.get("typePassage").value ).includes('other')) {
      if (!this.inventoryForm.get("typePassageOther").value) {
        this.inventoryForm.patchValue({typePassageOther: null});
        this.inventoryForm.get("typePassage").patchValue(Array.from(this.inventoryForm.get("typePassage").value).filter(elm => elm != "other"));
      }
      else this.isTypePassageOther = true;
    }else this.inventoryForm.patchValue({typePassageOther: null});
    if (this.inventoryForm.get("accessibilite").value == "other") {
      if (!this.inventoryForm.get("accessibiliteOther").value) {
        this.inventoryForm.patchValue({accessibiliteOther: null});
        this.inventoryForm.get("accessibilite").patchValue("");
      }
      else this.isAccessibiliteOther = true;
    }else this.inventoryForm.patchValue({accessibiliteOther: null});
    if (this.inventoryForm.get("etatGeneral").value.length && Array.from(this.inventoryForm.get("etatGeneral").value ).includes('comment')) {
      if (!this.inventoryForm.get("etatSanGeneralOther").value) {
        this.inventoryForm.patchValue({etatSanGeneralOther: ""});
        this.inventoryForm.get("etatGeneral").patchValue(Array.from(this.inventoryForm.get("etatGeneral").value).filter(elm => elm != "comment"));
      } else this.isHeathDiagOther = true;
    } else this.inventoryForm.patchValue({etatSanGeneralOther: ""});
    if (this.inventoryForm.get("etatGeneral").value.length > 0 && Array.from(this.inventoryForm.get("etatGeneral").value).includes('champignons-lignivores')) {
      if (this.inventoryForm.get("etatSanGeneralChampignons").value.length === 0) {
        this.inventoryForm.patchValue({etatSanGeneralChampignons: []});
        this.inventoryForm.get("etatGeneral").patchValue(Array.from(this.inventoryForm.get("etatGeneral").value).filter(elm => elm != "champignons-lignivores"));
      } else this.isHealthDiagChampignons = true;
    } else this.inventoryForm.patchValue({etatSanGeneralChampignons: []});
    if (this.inventoryForm.get("etatGeneral").value.length && Array.from(this.inventoryForm.get("etatGeneral").value ).includes('parasite')) {
      if (this.inventoryForm.get("etatSanGeneralParasite").value.length === 0) {
        this.inventoryForm.patchValue({etatSanGeneralParasite: []});
        this.inventoryForm.get("etatGeneral").patchValue(Array.from(this.inventoryForm.get("etatGeneral").value).filter(elm => elm != "parasite"));
      } else this.isHealthDiagParasite = true;
    } else this.inventoryForm.patchValue({etatSanGeneralParasite: []});

    const parasiteOther = this.findObjectParasiteByIdAutres();
    if (parasiteOther && this.inventoryForm.get("etatSanGeneralParasite").value && Array.from(this.inventoryForm.get("etatSanGeneralParasite").value ).includes(parasiteOther.toString())) {
      if (!this.inventoryForm.get("etatSanGeneralParasiteAutres").value) {
        this.inventoryForm.patchValue({etatSanGeneralParasiteAutres: null});
        this.inventoryForm.get("etatSanGeneralParasite").patchValue(Array.from(this.inventoryForm.get("etatSanGeneralParasite").value).filter(elm => elm != parasiteOther.toString()));
      } else this.isHealthDiagParasiteOther = true;
    } else this.inventoryForm.patchValue({etatSanGeneralParasiteAutres: null});

    if (this.inventoryForm.get("travaux").value.length && Array.from(this.inventoryForm.get("travaux").value ).includes('other')) {
      if (!this.inventoryForm.get("travauxOther").value) {
        this.inventoryForm.patchValue({travauxOther: null});
        this.inventoryForm.get("travaux").patchValue(Array.from(this.inventoryForm.get("travaux").value).filter(elm => elm != "other"));
      } else this.isTravauxOther = true;
    } else this.inventoryForm.patchValue({travauxOther: null});
    if (this.inventoryForm.get("travaux").value.length && Array.from(this.inventoryForm.get("travaux").value ).includes('protection-particuliere-precisez')) {
      if (!this.inventoryForm.get("travauxProtection").value) {
        this.inventoryForm.patchValue({travauxProtection: null});
        this.inventoryForm.get("travaux").patchValue(Array.from(this.inventoryForm.get("travaux").value).filter(elm => elm != "protection-particuliere-precisez"));
      } else this.isTravauxProtection = true;
    } else this.inventoryForm.patchValue({travauxProtection: null});
    if (this.inventoryForm.get("travaux").value.length && Array.from(this.inventoryForm.get("travaux").value ).includes('soin-particulier-precisez')) {
      if (!this.inventoryForm.get("travauxSoin").value) {
        this.inventoryForm.patchValue({travauxSoin: null});
        this.inventoryForm.get("travaux").patchValue(Array.from(this.inventoryForm.get("travaux").value).filter(elm => elm != "soin-particulier-precisez"));
      } else this.isTravauxSoin = true;
    } else this.inventoryForm.patchValue({travauxSoin: null});
  }

  update() {
    if (this.invalidFormData()) {
      this.customAlertService.toastAlert('Certaine valeurs sont incorrectes', 'toast-top-right', 'error');
      return;
    }
    this.initVariables();
    this.inventoryForm.patchValue({
      userEditedDateTravaux: EcheanceDateService.formatToServer(this.inventoryForm.value.userEditedDateTravaux),
      etatSanGeneralParasite: this.inventoryForm.get('etatSanGeneralParasite').value.length !== 0 ?
        this.inventoryForm.get('etatSanGeneralParasite').value.map((val: any) => parseInt(val)) : [],
      etatSanGeneralChampignons: this.inventoryForm.get('etatSanGeneralChampignons').value.length !== 0 ?
        this.inventoryForm.get('etatSanGeneralChampignons').value.map((val: any) => parseInt(val)) : [],
      healthIndex: BevaService.getValueColumn(this.inventoryForm.get('healthColumn').value, bevaConst.HEALTH_INDEX_VALUE),
      aestheticIndex: BevaService.getValueColumn(this.inventoryForm.get('aestheticColumn').value, bevaConst.AESTHETIC_INDEX_VALUE)
    });

    this.visibleSpinner = true;
    this.essenceService.update(this.inventoryForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.router.navigate([`/admin/inventaires/essence/${id}`]);
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Modification impossible', 'toast-top-right', 'error');
      })
  }

  getOneEssence() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // setUrlBackInventoryDetail

    this.visibleSpinner = true;
    this.essenceService.getOneEssence(parseInt(id))
      .subscribe((data: Essence) => {
        this.visibleSpinner = false;
        this.essence = data;
        // set url back inventory
        this.urlService.setId(this.essence.inventaire.id.toString());
        this.getChampignons();
        this.getParasites();
        this.initForm();
        this.initVariables();
      }, () => {
        this.visibleSpinner = false;
      });
  }
  getImageEssence() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // setUrlBackInventoryDetail

    this.visibleSpinner = true;
    this.essenceService.getOneEssence(parseInt(id))
      .subscribe((data: Essence) => {
        this.visibleSpinner = false;
        this.essence.imageUrl = data.imageUrl;
        // set url back inventory
        this.urlService.setId(this.essence.inventaire.id.toString());
        this.getChampignons();
        this.getParasites();
      }, () => {
        this.visibleSpinner = false;
      });
  }

  transformDate(date) {
    if (!date) {
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 2,
        day: now.getDate()
      }
    }
    return {
      year: moment(date).year(),
      month: moment(date).month() + 1,
      day: moment(date).date(),
    }

  }

  // VALUE OPTIONS SELECTED
  autoCompleteSelectOptions(): void {
    this.caractOptions = this.inventaireService.factorySelectArray(inventoryConst.CARACT_TAB, this.caractOptions);
    this.stadeDevOptions = this.inventaireService.factorySelectArray(inventoryConst.STADE_DEV_TAB, this.stadeDevOptions);
    this.houppierOptions = this.inventaireService.factorySelectArray(inventoryConst.HOUPPIER_TAB, this.houppierOptions);
    this.critereOptions = this.inventaireService.factorySelectArray(inventoryConst.CRITERE_TAB, this.critereOptions);
    this.domaineOptions = this.inventaireService.factorySelectArray(inventoryConst.DOMAINE_TAB, this.domaineOptions);
    this.nuisanceOptions = this.inventaireService.factorySelectArray(inventoryConst.NUISANCE_TAB, this.nuisanceOptions);
    this.proximiteOptions = this.inventaireService.factorySelectArray(inventoryConst.PROXIMITE_TAB, this.proximiteOptions);
    this.proximiteWithDictOptions = this.inventaireService.factorySelectArray(inventoryConst.PROXIMITE_WITH_DICT, this.proximiteWithDictOptions);
    this.tauxFreqOptions = this.inventaireService.factorySelectArray(inventoryConst.TAUX_FREQ_TAB, this.tauxFreqOptions);
    this.typePassageOptions = this.inventaireService.factorySelectArray(inventoryConst.TYPE_PASSAGE_TAB, this.typePassageOptions);
    this.accessibiliteOptions = this.inventaireService.factorySelectArray(inventoryConst.ACCESSIBILITE_TAB, this.accessibiliteOptions);
    this.etatGeneralOptions = this.inventaireService.factorySelectArray(inventoryConst.ETAT_GENERAL_TAB, this.etatGeneralOptions);
    this.risqueOptions = this.inventaireService.factorySelectArray(inventoryConst.RISQUE_TAB, this.risqueOptions);
    this.travauxOptions = this.inventaireService.factorySelectArray(inventoryConst.TRAVAUX_TAB, this.travauxOptions);
    this.dateTravauxOptions = this.inventaireService.factorySelectArray(inventoryConst.DATE_TRAVAUX_TAB, this.dateTravauxOptions);
  }

  getChampignons() {
    this.champignonsService.list().toPromise()
      .then((data: Champignons[]) => {
        data.map((elt: Champignons) => {
            this.champignonsOptions = [
              ...this.champignonsOptions,
              {
                label: elt.name,
                value: elt.id.toString()
              }]
          }
        )
      })
  }

   getParasites() {
    this.nuisibleService.list().toPromise()
      .then((data: any) => {
        data.filter(elt => elt.name == 'Autre').map(res => {
          res.name = 'Autre';
          res.code = 'Autre'
        })
        data.map((elt: Nuisible) => {
          this.parasitesOptions = [
            ...this.parasitesOptions,
            {
              label: elt.name.charAt(0).toUpperCase() + elt.name.slice(1),
              value: elt.id.toString()
            }]
        }
        )
        this.parasitesOptions.sort((a, b) => a.label.localeCompare(b.label))
      })
  }

  // VALUE OPTIONS EVENT
  isCaractOtherChange(event): void {
    this.inventoryForm.patchValue({caractOther: null});
    this.isCaractOther = event === 'other';
  }

  isCritereOtherChange(event) {
    this.inventoryForm.patchValue({critereOther: null});
    this.isCritereOther = (event && 'other' === event.find(val => val == 'other'));
  }

  isProximiteChange(event) {
    this.inventoryForm.patchValue({proximiteOther: null});
    this.isProximiteOther = ('other' === event.find(val => val == 'other'));
  }

  isTypePassageChange(event) {
    this.inventoryForm.patchValue({typePassageOther: null});
    this.isTypePassageOther = ('other' === event.find(val => val == 'other'));
  }

  isAccessibiliteChange(event) {
    this.inventoryForm.patchValue({accessibiliteOther: null});
    this.isAccessibiliteOther = event == 'other';
  }

  isTravauxChange(event) {
    if ('other' === event.find(val => val == 'other')) {
      this.isTravauxOther = true;
    } else {
      this.isTravauxOther = false;
      this.inventoryForm.patchValue({travauxOther: null});
    }

    if ('protection-particuliere-precisez' === event.find(val => val == 'protection-particuliere-precisez')) {
      this.isTravauxProtection = true;
    } else {
      this.isTravauxProtection = false;
      this.inventoryForm.patchValue({travauxProtection: null});
    }

    if ('soin-particulier-precisez' === event.find(val => val == 'soin-particulier-precisez')) {
      this.isTravauxSoin = true;
    } else {
      this.isTravauxSoin = false;
      this.inventoryForm.patchValue({travauxSoin: null});
    }
  }

  isHeathDiagChange(event) {

    if ('comment' === event.find(val => val == 'comment')) {
      this.isHeathDiagOther = true;
    } else {
      this.isHeathDiagOther = false;
      this.inventoryForm.patchValue({etatSanGeneralOther: null});

    }

    if ('champignons-lignivores' === event.find(val => val == 'champignons-lignivores')) {
      this.isHealthDiagChampignons = true;
    } else {
      this.isHealthDiagChampignons = false;
      this.inventoryForm.patchValue({etatSanGeneralChampignons: []});
    }

    if ('parasite' === event.find(val => val == 'parasite')) {
      this.isHealthDiagParasite = true;
    } else {
      this.isHealthDiagParasite = false;
      this.inventoryForm.patchValue({etatSanGeneralParasite: []});
    }
  }

  findObjectParasiteByIdAutres() {
    return this.parasitesOptions.filter((elt: IOption) => elt.label === 'Autre').map((elt: IOption) => elt.value)[0]
  }

  isHealthDiagNuisibleOther(event) {
    const parasiteOther = this.findObjectParasiteByIdAutres();

    if (parasiteOther && parasiteOther.toString() === event.find(elt => (elt === parasiteOther.toString()))) {
      this.isHealthDiagParasiteOther = true;
    } else {
      this.isHealthDiagParasiteOther = false;
      this.inventoryForm.patchValue({etatSanGeneralParasiteAutres: null});
    }
  }

  isEcheanceChange(event) {
    this.inventoryForm.patchValue({
      userEditedDateTravaux: EcheanceDateService.customDateTravaux(event)
    });
  }

  modifImg(position) {
    this.canvasImgVisible = true;
    this.positionImg = position
  }

  uploadImage() {
    this.selectedFile = this.uploader.queue;
    if (this.selectedFile.length === 0) {
      return;
    }

    this.visibleSpinner = true;
    return this.essenceService.addImgEssence(this.selectedFile, this.essence.id, this.positionImg)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.canvasImgVisible = false;
        this.uploader.queue = [];
        // this.getOneEssence()
        this.getImageEssence();
      }, () => {
        this.errorMessage.show = true;
        this.errorMessage.message = 'Impossible d\'uploader les images';
        setTimeout(() => {
          this.successMessage.show = false;
        }, 6000);
      })
  }

  rotate(position) {
    if (position === 1) {
      switch (this.rotationImg1) {
        case 0:
        case null:
          this.rotationImg1 = 90;
          document.getElementById('img-1').style.transform = "rotate(90deg)";
          break;
        case 90:
          this.rotationImg1 = 180;
          document.getElementById('img-1').style.transform = "rotate(180deg)";
          break;
        case 180:
          this.rotationImg1 = 270;
          document.getElementById('img-1').style.transform = "rotate(270deg)";
          break;
        case 270:
          this.rotationImg1 = 0;
          document.getElementById('img-1').style.transform = "rotate(0deg)";
          break;
      }
    } else if (position === 2) {
      switch (this.rotationImg2) {
        case 0:
        case null:
          this.rotationImg2 = 90;
          document.getElementById('img-2').style.transform = "rotate(90deg)";
          break;
        case 90:
          this.rotationImg2 = 180;
          document.getElementById('img-2').style.transform = "rotate(180deg)";
          break;
        case 180:
          this.rotationImg2 = 270;
          document.getElementById('img-2').style.transform = "rotate(270deg)";
          break;
        case 270:
          this.rotationImg2 = 0;
          document.getElementById('img-2').style.transform = "rotate(0deg)";
          break;
      }
    } else if (position === 3) {
      switch (this.rotationImg3) {
        case 0:
        case null:
          this.rotationImg3 = 90;
          document.getElementById('img-3').style.transform = "rotate(90deg)";
          break;
        case 90:
          this.rotationImg3 = 180;
          document.getElementById('img-3').style.transform = "rotate(180deg)";
          break;
        case 180:
          this.rotationImg3 = 270;
          document.getElementById('img-3').style.transform = "rotate(270deg)";
          break;
        case 270:
          this.rotationImg3 = 0;
          document.getElementById('img-3').style.transform = "rotate(0deg)";
          break;
      }
    }
  }

  deleteImg(position) {
    this.visibleSpinner = true;
    this.essenceService.deleteImgEssence(position, this.essence.id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.successMessage.show = true;
        this.successMessage.message = 'Image supprimée avec succès';
        setTimeout(() => {
          this.successMessage.show = false;
        }, 10000);
        // this.getOneEssence()
        this.getImageEssence();
      }, () => {
        this.visibleSpinner = false;
        this.successMessage.show = false;
        this.errorMessage.message = 'Impossible de supprimer l\'image';
        this.errorMessage.show = true;
      })
  }

  updateRotation() {
    if (this.rotationImg1) {
      this.rotateStaticImg(1, this.rotationImg1);
    }
    if (this.rotationImg2) {
      this.rotateStaticImg(2, this.rotationImg2);
    }
    if (this.rotationImg3) {
      this.rotateStaticImg(3, this.rotationImg3);
    }
  }

  rotateStaticImg(position, rotation) {

    this.visibleSpinner = true;
    this.inventaireService.rotateImg(position, this.essence.id, rotation, 'essence')
      .subscribe(() => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.successMessage.message = 'Image pivotée avec succès';
        // this.successMessage.show = true;
        this.customAlertService.toastAlert('Image pivotée avec succès', 'toast-top-right', 'success');
        this.location = true;
        // this.getOneEssence();
        this.getImageEssence();
      }, () => {
        this.visibleSpinner = false;
        this.successMessage.show = false;
        this.errorMessage.message = 'Impossible de pivoter l\'image';
        this.customAlertService.toastAlert('Impossible de pivoter l\'image', 'toast-top-right', 'error');
        // this.errorMessage.show = true;
      })
  }

  onChangeEtatSanChampignonsOther(event) {
    let data: IOption = this.champignonsOptions.find((elt: IOption) => elt.label == 'Je ne sais pas')
    this.isEtatSanChampignonsAutres = !!event.find((elt: string) => data && elt == data.value);
  }

  invalidFormData(): boolean {
    return this.inventoryForm.invalid;
  }

  onChangeValueEspece(event: Espece): void {
    if (!event) return;
    this.inventoryForm.patchValue({
      varietyGrade: event.indiceEspece
    });
  }
}
