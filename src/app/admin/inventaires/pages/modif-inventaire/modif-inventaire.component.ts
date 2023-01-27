import {Component, OnInit} from '@angular/core';
import {fallIn, moveInUp, rotateImg} from "../../../../router.animations";
import {Inventaire} from "../../shared/model/inventaire.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomAlertService} from "../../../../customAlertService.service";
import {InventaireService} from "../../shared/service/inventaire.service";
import {IOption} from "ng-select";

import * as inventoryConst from '../../shared/constant/inventaire.constants';
import {AppService} from "../../../../app.service";
import {ErrorMessage, SuccessMessage} from "../../../../shared/modele/error.interface";
import {environment} from "../../../../../environments/environment";
import {FileUploader} from "ng2-file-upload";
import {EcheanceDateService} from "../../shared/service/echeance-date.service";
import {EspeceService} from "../../../config-inventaire/shared/service/espece.service";
import {Espece} from "../../../config-inventaire/shared/model/espece.interface";
import {ChampignonsService} from "../../../config-inventaire/shared/service/champignons.service";
import {Champignons} from "../../../config-inventaire/shared/model/Champignons";
import {NuisibleService} from "../../../config-inventaire/shared/service/nuisible.service";
import {Nuisible} from "../../../config-inventaire/shared/model/nuisible.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BevaService} from "../../shared/service/beva.service";
import * as bevaConst from "../../shared/constant/beva.const";
import {BackButtonUrlService} from "../../shared/service/backButtonUrl.service";

const now = new Date();

@Component({
  selector: 'app-modif-inventaire',
  templateUrl: './modif-inventaire.component.html',
  styleUrls: [
    './modif-inventaire.component.scss',
    '../../../../../vendor/libs/ng2-archwizard/ng2-archwizard.scss',
    '../../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss'
  ],
  animations: [moveInUp(), fallIn(), rotateImg()]
})
export class ModifInventaireComponent implements OnInit {

  state: any;
  inventaire: Inventaire;
  originalInventaire: any;
  visibleSpinner = false;

  disabled = false;
  selectOptions: Array<IOption> = [];
  champignonsOptions: Array<IOption> = [];
  parasitesOptions: Array<IOption> = [];

  caractPiedOptions: Array<IOption> = [];
  caractTroncOptions: Array<IOption> = [];
  portArbreOptions: Array<IOption> = [];
  stadeDevOptions: Array<IOption> = [];
  critereOptions: Array<IOption> = [];
  domaineOptions: Array<IOption> = [];
  implantationOptions: Array<IOption> = [];
  proximiteOptions: Array<IOption> = [];
  proximiteWithDictOptions: Array<IOption> = [];
  nuisanceOptions: Array<IOption> = [];
  tauxFreqOptions: Array<IOption> = [];
  typePassageOptions: Array<IOption> = [];
  accessibiliteOptions: Array<IOption> = [];
  etatSanColletOptions: Array<IOption> = [];
  etatSanTroncOptions: Array<IOption> = [];
  etatSanHouppierOptions: Array<IOption> = [];
  etatSanGeneralOptions: Array<IOption> = [];

  risqueOptions: Array<IOption> = [];
  risqueGeneralOptions: Array<IOption> = [];
  abattageOptions: Array<IOption> = [];
  dateTravauxOptions: Array<IOption> = [];
  risqueRuptureOptions: Array<IOption> = [];

  // TRAVAUX MULTIPLE
  travauxColletMultipleOptions: IOption[] = [];
  travauxTroncMultipleOptions: IOption[] = [];
  travauxHouppierMultipleOptions: IOption[] = [];

  isTroncMutiples = false;
  isCaractPiedOther = false;
  isCritereOther = false;
  isProximiteOther = false;
  isTypePassageOther = false;
  isAccessibliteOther = false;
  isRisqueGeneralOther = false;
  isEtatSanColletChampignons = false;
  isEtatSanTroncParasites = false;
  isEtatSanTroncChampignons = false;
  isEtatSanColletCavite = false;
  isEtatSanTroncCavite = false;
  isEtatSanTroncCorpsEtranger = false;
  isEtatSanTroncAutre = false;
  isEtatSanHouppierAutre = false;
  isEtatSanHouppierChampignons = false;
  isEtatSanHouppierParasites = false;
  isEtatSanTroncNuisiblesAutres = false;
  isEtatSanHouppierNuisiblesAutres = false;
  isEtatSanGeneralOther = false
  isTravauxColletOther = false;
  isTravauxTroncOther = false;
  isTravauxTroncProtection = false;
  isTravauxHouppierOther = false;
  isEtatSanColletChampignonsAutres: boolean = false;
  isEtatSanTroncChampignonsAutres: boolean = false;
  isEtatSanHouppierChampignonsAutres: boolean = false;

  isEtatSanColletOther: boolean = false;
  isEtatSanTroncOther: boolean = false;
  isEtatSanHouppierOther: boolean = false;

  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  location = false;
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
  pivotVisible = false;
  positionImg: any = 0;

  stateImg1: string = 'default';
  stateImg2: string = 'default';
  stateImg3: string = 'default';

  rotationImg1: number = 0;
  rotationImg2: number = null;
  rotationImg3: number = null;

  current = new Date().getTime();

  inventoryForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customAlertService: CustomAlertService,
    private inventaireService: InventaireService,
    public appService: AppService,
    private router: Router,
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
    this.getOneInventaire();
    this.getEspeces();
    this.autoCompleteSelectOptions();
  }

  initForm() {
    this.inventoryForm = this.fb.group({
      // Identification
      espece: [this.inventaire.arbre.espece.id.toString(), [Validators.required]],
      diametre: [this.inventaire.arbre.diametre, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      hauteur: [this.inventaire.arbre.hauteur, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      codeSite: [this.inventaire.arbre.codeSite],
      numSujet: [this.inventaire.arbre.numSujet],
      // Caractéristiques
      caractPied: [this.inventaire.arbre.caractPied],
      caractPiedOther: [this.inventaire.arbre.caractPiedOther],
      caractTronc: [this.inventaire.arbre.caractTronc],
      caractTroncMultiples: [this.inventaire.arbre.caractTroncMultiples, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')],
      portArbre: [this.inventaire.arbre.portArbre],
      stadeDev: [this.inventaire.arbre.stadeDev],
      critere: [this.inventaire.arbre.critere],
      critereOther: [this.inventaire.arbre.critereOther],

      // Environnement
      implantation: [this.inventaire.arbre.implantation],
      domaine: [this.inventaire.arbre.domaine],
      proximite: [this.inventaire.arbre.proximite],
      proximiteOther: [this.inventaire.arbre.proximiteOther],
      proximiteWithDict: [this.inventaire.arbre.proximiteWithDict],
      nuisance: [this.inventaire.arbre.nuisance],
      tauxFreq: [this.inventaire.arbre.tauxFreq],
      typePassage: [this.inventaire.arbre.typePassage],
      typePassageOther: [this.inventaire.arbre.typePassageOther],
      accessibilite: [this.inventaire.arbre.accessibilite],
      accessibiliteOther: [this.inventaire.arbre.accessibiliteOther],
      // Health Diag
      etatSanCollet: [this.inventaire.arbre.etatSanCollet],
      etatSanColletChampignons: [this.inventaireService.factoryDataModelOptions(this.inventaire.arbre.etatSanColletChampignons, [])],
      etatSanColletChampignonsAutres: [this.inventaire.arbre.etatSanColletChampignonsAutres],
      etatSanColletCavite: [this.inventaire.arbre.etatSanColletCavite],
      etatSanTronc: [this.inventaire.arbre.etatSanTronc],
      etatSanTroncChampignons: [this.inventaireService.factoryDataModelOptions(this.inventaire.arbre.etatSanTroncChampignons, [])],
      etatSanTroncChampignonsAutres: [this.inventaire.arbre.etatSanTroncChampignonsAutres],
      etatSanTroncNuisibles: [this.inventaireService.factoryDataModelOptions(this.inventaire.arbre.etatSanTroncNuisibles, [])],
      etatSanTroncNuisiblesAutres: [this.inventaire.arbre.etatSanTroncNuisiblesAutres],
      etatSanTroncCorpsEtranger: [this.inventaire.arbre.etatSanTroncCorpsEtranger],
      etatSanTroncCavite: [this.inventaire.arbre.etatSanTroncCavite],
      etatSanHouppier: [this.inventaire.arbre.etatSanHouppier],
      etatSanHouppierChampignons: [this.inventaireService.factoryDataModelOptions(this.inventaire.arbre.etatSanHouppierChampignons, [])],
      etatSanHouppierChampignonsAutres: [this.inventaire.arbre.etatSanHouppierChampignonsAutres],
      etatSanHouppierNuisibles: [this.inventaireService.factoryDataModelOptions(this.inventaire.arbre.etatSanHouppierNuisibles, [])],
      etatSanHouppierNuisiblesAutres: [this.inventaire.arbre.etatSanHouppierNuisiblesAutres],
      etatSanGeneral: [this.inventaire.arbre.etatSanGeneral],
      etatSanGeneralOther: [this.inventaire.arbre.etatSanGeneralOther],

      // risque rupture
      risqueCollet: [this.inventaire.arbre.risque && this.inventaireService.transformRisqueRupture(this.inventaire.arbre.risque)[0]],
      risqueTronc: [this.inventaire.arbre.risque && this.inventaireService.transformRisqueRupture(this.inventaire.arbre.risque)[1]],
      risqueHouppier: [this.inventaire.arbre.risque && this.inventaireService.transformRisqueRupture(this.inventaire.arbre.risque)[2]],
      risque: [this.inventaire.arbre.risque],
      risqueGeneral: [this.inventaire.arbre.risqueGeneral],
      risqueGeneralOther: [this.inventaire.arbre.risqueGeneralOther],

      // travaux
      abattage: [this.inventaire.arbre.abattage],
      travauxColletMultiple: [this.inventaire.arbre.travauxColletMultiple],
      travauxColletOther: [this.inventaire.arbre.travauxColletOther],
      travauxTroncMultiple: [this.inventaire.arbre.travauxTroncMultiple],
      travauxTroncOther: [this.inventaire.arbre.travauxTroncOther],
      travauxTroncProtection: [this.inventaire.arbre.travauxTroncProtection],
      travauxHouppierMultiple: [this.inventaire.arbre.travauxHouppierMultiple],
      travauxHouppierOther: [this.inventaire.arbre.travauxHouppierOther],
      dateTravaux: [this.inventaire.arbre.dateTravaux ? this.inventaire.arbre.dateTravaux : this.inventaire.arbre.dateProVisite],
      userEditedDateTravaux: [EcheanceDateService.formatDateToModel(this.inventaire.arbre.userEditedDateTravaux)],
      // Beva
      varietyGrade: [(''+this.inventaire.arbre.varietyGrade).replace(/[.]/g, ","), [Validators.pattern('^[0-9]+([,][0-9]+)?$')]],
      healthIndex: [this.inventaire.arbre.healthIndex],
      aestheticIndex: [this.inventaire.arbre.aestheticIndex],
      locationIndex: [this.inventaire.arbre.locationIndex],
      healthColumn: [this.inventaire.arbre.healthColumn],
      aestheticColumn: [this.inventaire.arbre.aestheticColumn],
      beva: [this.inventaire.arbre.beva],

      // Coord
      coord: [{lat: this.inventaire.arbre.coord.lat, long: this.inventaire.arbre.coord.long}],
      id: this.inventaire.id,
      isFinished: this.inventaire.isFinished,
      type: this.inventaire.type,

      // Etat san collet, tronc, houppier
      etatSanColletOther: [this.inventaire.arbre.etatSanColletOther],
      etatSanTroncOther: [this.inventaire.arbre.etatSanTroncOther],
      etatSanHouppierOther: [this.inventaire.arbre.etatSanHouppierOther]
    });
  }

  initVariables() {
    if (this.inventoryForm.get("caractTronc").value == "tronc-multiples") {
      if (!this.inventoryForm.get("caractTroncMultiples").value) {
        this.inventoryForm.patchValue({caractTroncMultiples: null});
        this.inventoryForm.get("caractTronc").patchValue("");
      }
      else this.isTroncMutiples = true
    }else this.inventoryForm.patchValue({caractTroncMultiples: null})
    if (Array.isArray(this.inventoryForm.get("caractPied").value) && Array.from(this.inventoryForm.get("caractPied").value).includes('other')) {
      if (!this.inventoryForm.get("caractPiedOther").value) {
        this.inventoryForm.patchValue({caractPiedOther: null});
        this.inventoryForm.get("caractPied").patchValue(Array.from(this.inventoryForm.get("caractPied").value).filter(elm => elm != "other"));
      }
      else this.isCaractPiedOther = true;
    }else this.inventoryForm.patchValue({caractPiedOther: null});
    if (this.inventoryForm.get("critere").value && Array.from(this.inventoryForm.get("critere").value ).includes('autre-precisez')) {
      if (!this.inventoryForm.get("critereOther").value) {
        this.inventoryForm.patchValue({critereOther: null});
        this.inventoryForm.get("critere").patchValue(Array.from(this.inventoryForm.get("critere").value).filter(elm => elm != "autre-precisez"));
      } else this.isCritereOther = true;
    } else this.inventoryForm.patchValue({critereOther: null});
    if (this.inventoryForm.get("proximite").value && Array.from(this.inventoryForm.get("proximite").value ).includes('other')) {
      if (!this.inventoryForm.get("proximiteOther").value) {
        this.inventoryForm.patchValue({proximiteOther: null});
        this.inventoryForm.get("proximite").patchValue(Array.from(this.inventoryForm.get("proximite").value).filter(elm => elm != "other"));
      } else this.isProximiteOther = true;
    }else this.inventoryForm.patchValue({proximiteOther: null});
    if (this.inventoryForm.get("typePassage").value && Array.from(this.inventoryForm.get("typePassage").value ).includes('other')) {
      if (!this.inventoryForm.get("typePassageOther").value) {
        this.inventoryForm.patchValue({typePassageOther: null});
        this.inventoryForm.get("typePassage").patchValue(Array.from(this.inventoryForm.get("typePassage").value).filter(elm => elm != "other"));
      } else this.isTypePassageOther = true;
    } else this.inventoryForm.patchValue({typePassageOther: null});

    if (this.inventoryForm.get("accessibilite").value == 'other') {
      if (!this.inventoryForm.get("accessibiliteOther").value) {
        this.inventoryForm.patchValue({accessibiliteOther: null});
        this.inventoryForm.get("accessibilite").patchValue(Array.from(this.inventoryForm.get("accessibilite").value).filter(elm => elm != "other"));
      } else this.isAccessibliteOther = true;
    } else this.inventoryForm.patchValue({accessibiliteOther: null});
    if (this.inventoryForm.get("risqueGeneral").value && Array.from(this.inventoryForm.get("risqueGeneral").value ).includes('other')) {
      if (!this.inventoryForm.get("risqueGeneralOther").value) {
        this.inventoryForm.patchValue({risqueGeneralOther: null});
        this.inventoryForm.get("risqueGeneral").patchValue(Array.from(this.inventoryForm.get("risqueGeneral").value).filter(elm => elm != "other"));
      } else this.isRisqueGeneralOther = true;
    } else this.inventoryForm.patchValue({risqueGeneralOther: null});
    if (this.inventoryForm.get("etatSanCollet").value && Array.from(this.inventoryForm.get("etatSanCollet").value ).includes('champignons-lignivores')) {
      if (!this.inventoryForm.get("etatSanColletChampignons").value.length) {
        this.inventoryForm.patchValue({etatSanColletChampignons: []});
        this.inventoryForm.get("etatSanCollet").patchValue(Array.from(this.inventoryForm.get("etatSanCollet").value).filter(elm => elm != "champignons-lignivores"));
      } else this.isEtatSanColletChampignons = true;
    } else this.inventoryForm.patchValue({etatSanColletChampignons: []});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('parasite')) {
      if (!this.inventoryForm.get("etatSanTroncNuisibles").value.length) {
        this.inventoryForm.patchValue({etatSanTroncNuisibles: []});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "parasite"));
      } else this.isEtatSanTroncParasites = true;
    } else this.inventoryForm.patchValue({etatSanTroncNuisibles: []});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('champignons-lignivores')) {
      if (!this.inventoryForm.get("etatSanTroncChampignons").value.length) {
        this.inventoryForm.patchValue({etatSanTroncChampignons: []});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "champignons-lignivores"));
      } else this.isEtatSanTroncChampignons = true;
    } else this.inventoryForm.patchValue({etatSanTroncChampignons: []});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('parasite')) {
      if (!this.inventoryForm.get("etatSanTroncNuisibles").value.length) {
        this.inventoryForm.patchValue({etatSanTroncNuisibles: []});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "parasite"));
      } else this.isEtatSanTroncParasites = true;
    } else this.inventoryForm.patchValue({etatSanTroncNuisibles: []});
    if (this.inventoryForm.get("etatSanCollet").value && Array.from(this.inventoryForm.get("etatSanCollet").value ).includes('other')) {
      if (!this.inventoryForm.get("etatSanColletOther").value) {
        this.inventoryForm.patchValue({etatSanColletOther: null});
        this.inventoryForm.get("etatSanCollet").patchValue(Array.from(this.inventoryForm.get("etatSanCollet").value).filter(elm => elm != "other"));
      } else this.isEtatSanColletOther = true;
    } else this.inventoryForm.patchValue({etatSanColletOther: null});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('cavit-nombre')) {
      if (!this.inventoryForm.get("etatSanTroncCavite").value) {
        this.inventoryForm.patchValue({etatSanTroncCavite: null});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "cavit-nombre"));
      } else this.isEtatSanTroncCavite = true;
    } else this.inventoryForm.patchValue({etatSanTroncCavite: null});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('corps-etranger')) {
      if (!this.inventoryForm.get("etatSanTroncCorpsEtranger").value) {
        this.inventoryForm.patchValue({etatSanTroncCorpsEtranger: null});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "corps-etranger"));
      } else this.isEtatSanTroncCorpsEtranger = true;
    } else this.inventoryForm.patchValue({etatSanTroncCorpsEtranger: null});
    if (this.inventoryForm.get("etatSanHouppier").value && Array.from(this.inventoryForm.get("etatSanHouppier").value ).includes('champignons-lignivores')) {
      if (!this.inventoryForm.get("etatSanHouppierChampignons").value.length) {
        this.inventoryForm.patchValue({etatSanHouppierChampignons: []});
        this.inventoryForm.get("etatSanHouppier").patchValue(Array.from(this.inventoryForm.get("etatSanHouppier").value).filter(elm => elm != "champignons-lignivores"));
      } else this.isEtatSanHouppierChampignons = true;
    } else this.inventoryForm.patchValue({etatSanHouppierChampignons: []});
    if (this.inventoryForm.get("etatSanHouppier").value && Array.from(this.inventoryForm.get("etatSanHouppier").value ).includes('parasite')) {
      if (!this.inventoryForm.get("etatSanHouppierNuisibles").value.length) {
        this.inventoryForm.patchValue({etatSanHouppierNuisibles: []});
        this.inventoryForm.get("etatSanHouppier").patchValue(Array.from(this.inventoryForm.get("etatSanHouppier").value).filter(elm => elm != "parasite"));
      } else this.isEtatSanHouppierParasites = true;
    } else this.inventoryForm.patchValue({etatSanHouppierNuisibles: []});
    const parasiteOther = this.findObjectParasiteByIdAutres();
    if (parasiteOther && this.inventoryForm.get("etatSanTroncNuisibles").value && Array.from(this.inventoryForm.get("etatSanTroncNuisibles").value ).includes(parasiteOther.toString())) {
      if (!this.inventoryForm.get("etatSanTroncNuisiblesAutres").value) {
        this.inventoryForm.patchValue({etatSanTroncNuisiblesAutres: null});
        this.inventoryForm.get("etatSanTroncNuisibles").patchValue(Array.from(this.inventoryForm.get("etatSanTroncNuisibles").value).filter(elm => elm != parasiteOther.toString()));
      } else this.isEtatSanTroncNuisiblesAutres = true;
    } else this.inventoryForm.patchValue({etatSanTroncNuisiblesAutres: null});
    if (parasiteOther && this.inventoryForm.get("etatSanHouppierNuisibles").value && Array.from(this.inventoryForm.get("etatSanHouppierNuisibles").value ).includes(parasiteOther.toString())) {
      if (!this.inventoryForm.get("etatSanHouppierNuisiblesAutres").value) {
        this.inventoryForm.patchValue({etatSanHouppierNuisiblesAutres: null});
        this.inventoryForm.get("etatSanHouppierNuisibles").patchValue(Array.from(this.inventoryForm.get("etatSanHouppierNuisibles").value).filter(elm => elm != parasiteOther.toString()));
      } else this.isEtatSanHouppierNuisiblesAutres = true;
    } else this.inventoryForm.patchValue({etatSanHouppierNuisiblesAutres: null});
    if (this.inventoryForm.get("etatSanCollet").value && Array.from(this.inventoryForm.get("etatSanCollet").value ).includes('cavit-nombre')) {
      if (!this.inventoryForm.get("etatSanColletCavite").value) {
        this.inventoryForm.patchValue({etatSanColletCavite: null});
        this.inventoryForm.get("etatSanCollet").patchValue(Array.from(this.inventoryForm.get("etatSanCollet").value).filter(elm => elm != "cavit-nombre"));
      } else this.isEtatSanColletCavite = true;
    } else this.inventoryForm.patchValue({etatSanColletCavite: null});
    if (this.inventoryForm.get("etatSanGeneral").value && Array.from(this.inventoryForm.get("etatSanGeneral").value ).includes('other')) {
      if (!this.inventoryForm.get("etatSanGeneralOther").value) {
        this.inventoryForm.patchValue({etatSanGeneralOther: null});
        this.inventoryForm.get("etatSanGeneral").patchValue(Array.from(this.inventoryForm.get("etatSanGeneral").value).filter(elm => elm != "other"));
      } else this.isEtatSanGeneralOther = true;
    } else this.inventoryForm.patchValue({etatSanGeneralOther: null});
    if (this.inventoryForm.get("travauxColletMultiple").value && Array.from(this.inventoryForm.get("travauxColletMultiple").value ).includes('other')) {
      if (!this.inventoryForm.get("travauxColletOther").value) {
        this.inventoryForm.patchValue({travauxColletOther: null});
        this.inventoryForm.get("travauxColletMultiple").patchValue(Array.from(this.inventoryForm.get("travauxColletMultiple").value).filter(elm => elm != "other"));
      } else this.isTravauxColletOther = true;
    } else this.inventoryForm.patchValue({travauxColletOther: null});
    if (this.inventoryForm.get("travauxTroncMultiple").value && Array.from(this.inventoryForm.get("travauxTroncMultiple").value ).includes('other')) {
      if (!this.inventoryForm.get("travauxTroncOther").value) {
        this.inventoryForm.patchValue({travauxTroncOther: null});
        this.inventoryForm.get("travauxTroncMultiple").patchValue(Array.from(this.inventoryForm.get("travauxTroncMultiple").value).filter(elm => elm != "other"));
      } else this.isTravauxTroncOther = true;
    } else this.inventoryForm.patchValue({travauxTroncOther: null});
    if (this.inventoryForm.get("travauxTroncMultiple").value && Array.from(this.inventoryForm.get("travauxTroncMultiple").value ).includes('protection')) {
      if (!this.inventoryForm.get("travauxTroncProtection").value) {
        this.inventoryForm.patchValue({travauxTroncProtection: null});
        this.inventoryForm.get("travauxTroncMultiple").patchValue(Array.from(this.inventoryForm.get("travauxTroncMultiple").value).filter(elm => elm != "protection"));
      } else this.isTravauxTroncProtection = true;
    } else this.inventoryForm.patchValue({travauxTroncProtection: null});
    if (this.inventoryForm.get("travauxHouppierMultiple").value && Array.from(this.inventoryForm.get("travauxHouppierMultiple").value ).includes('other')) {
      if (!this.inventoryForm.get("travauxHouppierOther").value) {
        this.inventoryForm.patchValue({travauxHouppierOther: null});
        this.inventoryForm.get("travauxHouppierMultiple").patchValue(Array.from(this.inventoryForm.get("travauxHouppierMultiple").value).filter(elm => elm != "other"));
      } else this.isTravauxHouppierOther = true;
    } else this.inventoryForm.patchValue({travauxHouppierOther: null});
    if (this.inventoryForm.get("etatSanCollet").value && Array.from(this.inventoryForm.get("etatSanCollet").value ).includes('other')) {
      if (!this.inventoryForm.get("etatSanColletOther").value) {
        this.inventoryForm.patchValue({etatSanColletOther: null});
        this.inventoryForm.get("etatSanCollet").patchValue(Array.from(this.inventoryForm.get("etatSanCollet").value).filter(elm => elm != "other"));
      } else this.isEtatSanColletOther = true;
    } else this.inventoryForm.patchValue({etatSanColletOther: null});
    if (this.inventoryForm.get("etatSanTronc").value && Array.from(this.inventoryForm.get("etatSanTronc").value ).includes('other')) {
      if (!this.inventoryForm.get("etatSanTroncOther").value) {
        this.inventoryForm.patchValue({etatSanTroncOther: null});
        this.inventoryForm.get("etatSanTronc").patchValue(Array.from(this.inventoryForm.get("etatSanTronc").value).filter(elm => elm != "other"));
      } else this.isEtatSanTroncOther = true;
    } else this.inventoryForm.patchValue({etatSanTroncOther: null});
    if (this.inventoryForm.get("etatSanHouppier").value && Array.from(this.inventoryForm.get("etatSanHouppier").value ).includes('other')) {
      if (!this.inventoryForm.get("etatSanHouppierOther").value) {
        this.inventoryForm.patchValue({etatSanHouppierOther: null});
        this.inventoryForm.get("etatSanHouppier").patchValue(Array.from(this.inventoryForm.get("etatSanHouppier").value).filter(elm => elm != "other"));
      } else this.isEtatSanHouppierOther = true;
    } else this.inventoryForm.patchValue({etatSanHouppierOther: null});
  }

  getOneInventaire() {
    // GET ONE INVENTAIRE
    this.visibleSpinner = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get url back
    this.urlService.setId(id);
    this.inventaireService.getOneInventaire(parseInt(id))
      .subscribe((data: Inventaire) => {
          this.originalInventaire = data;
          this.visibleSpinner = false;
          this.inventaire = data;
          // this.inventaire.arbre.varietyGrade = (''+this.inventaire.arbre.varietyGrade).replace(/[.]/g, ",")
          this.getChampignons();
          this.getParasites();
          this.initForm();
          this.initVariables();
        }, () => {
          this.visibleSpinner = false;
        }
      );
  }
  getImageInventaire() {
    // GET ONE INVENTAIRE
    this.visibleSpinner = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get url back
    this.urlService.setId(id);
    this.inventaireService.getOneInventaire(parseInt(id))
      .subscribe((data: Inventaire) => {
          this.originalInventaire.arbre.imgUrl = data.arbre.imgUrl;
          this.visibleSpinner = false;
          this.inventaire.arbre.imgUrl = data.arbre.imgUrl;
          this.getChampignons();
          this.getParasites();
        }, () => {
          this.visibleSpinner = false;
        }
      );
  }

  autoCompleteSelectOptions() {
    // AUTOCOMPLETE OPTIONS SELECTED
    this.caractPiedOptions = this.inventaireService.factorySelectArray(inventoryConst.CARACT_PIED_TAB, this.caractPiedOptions);
    this.caractTroncOptions = this.inventaireService.factorySelectArray(inventoryConst.CARACT_TRONC_TAB, this.caractTroncOptions);
    this.portArbreOptions = this.inventaireService.factorySelectArray(inventoryConst.PORT_ARBRE_TAB, this.portArbreOptions);
    this.stadeDevOptions = this.inventaireService.factorySelectArray(inventoryConst.STADE_DEV_TAB, this.stadeDevOptions);
    this.critereOptions = this.inventaireService.factorySelectArray(inventoryConst.CRITERE_TAB, this.critereOptions);
    this.domaineOptions = this.inventaireService.factorySelectArray(inventoryConst.DOMAINE_TAB, this.domaineOptions);
    this.implantationOptions = this.inventaireService.factorySelectArray(inventoryConst.IMPLANTATION_TAB, this.implantationOptions);
    this.proximiteOptions = this.inventaireService.factorySelectArray(inventoryConst.PROXIMITE_TAB, this.proximiteOptions);
    this.proximiteWithDictOptions = this.inventaireService.factorySelectArray(inventoryConst.PROXIMITE_WITH_DICT_TAB, this.proximiteWithDictOptions);
    this.nuisanceOptions = this.inventaireService.factorySelectArray(inventoryConst.NUISANCE_TAB, this.nuisanceOptions);
    this.tauxFreqOptions = this.inventaireService.factorySelectArray(inventoryConst.TAUX_FREQ_TAB, this.tauxFreqOptions);
    this.typePassageOptions = this.inventaireService.factorySelectArray(inventoryConst.TYPE_PASSAGE_TAB, this.typePassageOptions);
    this.accessibiliteOptions = this.inventaireService.factorySelectArray(inventoryConst.ACCESSIBILITE_TAB, this.accessibiliteOptions);

    // ETAT SANITAIRE
    this.etatSanColletOptions = this.inventaireService.factorySelectArray(inventoryConst.ETAT_SAN_COLLET_TAB, this.etatSanColletOptions);
    this.etatSanTroncOptions = this.inventaireService.factorySelectArray(inventoryConst.ETAT_SAN_TRONC_TAB, this.etatSanTroncOptions);
    this.etatSanHouppierOptions = this.inventaireService.factorySelectArray(inventoryConst.ETAT_SAN_HOUPPIER_TAB, this.etatSanHouppierOptions);
    this.etatSanGeneralOptions = this.inventaireService.factorySelectArray(inventoryConst.ETAT_SAN_GENERAL_TAB, this.etatSanGeneralOptions);
    this.risqueOptions = this.inventaireService.factorySelectArray(inventoryConst.RISQUE_TAB, this.risqueOptions);
    this.risqueGeneralOptions = this.inventaireService.factorySelectArray(inventoryConst.RISQUE_GENERAL_TAB, this.risqueGeneralOptions);
    // TRAVAUX
    this.abattageOptions = this.inventaireService.factorySelectArray(inventoryConst.ABATTAGE_TAB, this.abattageOptions);
    this.dateTravauxOptions = this.inventaireService.factorySelectArray(inventoryConst.DATE_TRAVAUX_TAB, this.dateTravauxOptions);

    this.travauxColletMultipleOptions = this.inventaireService.factorySelectArray(inventoryConst.TRAVAUX_COLLET_TAB, this.travauxColletMultipleOptions);
    this.travauxTroncMultipleOptions = this.inventaireService.factorySelectArray(inventoryConst.TRAVAUX_TRONC_TAB, this.travauxTroncMultipleOptions);
    this.travauxHouppierMultipleOptions = this.inventaireService.factorySelectArray(inventoryConst.TRAVAUX_HOUPPIER_TAB, this.travauxHouppierMultipleOptions);
    this.risqueRuptureOptions = this.inventaireService.factorySelectArray(inventoryConst.RISQUE_TAB.filter(res => res.name != 'other'), this.risqueRuptureOptions);
  }

  onChange(event) {
    this.inventoryForm.patchValue({caractTroncMultiples: null});
    this.isTroncMutiples = event === 'tronc-multiples';
  }

  isCaractPiedOtherchange(event) {
    this.inventoryForm.patchValue({caractPiedOther: ''});
    this.isCaractPiedOther = 'other' === event.find(elt => (elt == 'other'));
  }

  onChangeCritere(event) {
    this.inventoryForm.patchValue({critereOther: ''});
    this.isCritereOther = 'autre-precisez' === event.find(elt => (elt == 'autre-precisez'));
  }

  onChangeProximite(event) {
    this.inventoryForm.patchValue({proximiteOther: ''});
    this.isProximiteOther = 'other' === event.find(elt => (elt == 'other'));
  }

  onChangeTypePassage(event) {
    this.inventoryForm.patchValue({typePassageOther: ''});
    this.isTypePassageOther = 'other' === event.find(elt => (elt == 'other'));
  }

  onChangeAccessibilite(event) {
    this.inventoryForm.patchValue({accessibiliteOther: ''});
    this.isAccessibliteOther = event === 'other';
  }

  onChangeEtatSanCollet(event) {

    if ('champignons-lignivores' === event.find(data => data == 'champignons-lignivores')) {
      this.isEtatSanColletChampignons = true;
    } else {
      this.isEtatSanColletChampignons = false;
      this.inventoryForm.patchValue({
        etatSanColletChampignons: []
      })
    }

    if ('cavit-nombre' === event.find(elt => (elt == 'cavit-nombre'))) {
      this.isEtatSanColletCavite = true;
    } else {
      this.isEtatSanColletCavite = false;
      this.inventoryForm.patchValue({etatSanColletCavite: null})
    }

    if ('other' === event.find((elt: string) => elt == 'other')) {
      this.isEtatSanColletOther = true;
    } else {
      this.isEtatSanColletOther = false;
      this.inventoryForm.patchValue({etatSanColletOther: null})
    }
  }


  onChangeEtatSanTronc(event) {

    if ('champignons-lignivores' === event.find(elt => (elt == 'champignons-lignivores'))) {
      this.isEtatSanTroncChampignons = true;
    } else {
      this.isEtatSanTroncChampignons = false;
      this.inventoryForm.patchValue({etatSanTroncChampignons: []});
    }

    if ('parasite' === event.find(elt => (elt == 'parasite'))) {
      this.isEtatSanTroncParasites = true;
    } else {
      this.isEtatSanTroncParasites = false;
      this.inventoryForm.patchValue({etatSanTroncNuisibles: []});
    }

    if ('cavit-nombre' === event.find(elt => (elt == 'cavit-nombre'))) {
      this.isEtatSanTroncCavite = true;
    } else {
      this.isEtatSanTroncCavite = false;
      this.inventoryForm.patchValue({etatSanTroncCavite: null});
    }

    if ('corps-etranger' === event.find(elt => (elt == 'corps-etranger'))) {
      this.isEtatSanTroncCorpsEtranger = true;
    } else {
      this.isEtatSanTroncCorpsEtranger = false;
      this.inventoryForm.patchValue({etatSanTroncCorpsEtranger: null});
    }

    if ('other' === event.find((elt: string) => elt == 'other')) {
      this.isEtatSanTroncOther = true;
    } else {
      this.isEtatSanTroncOther = false;
      this.inventoryForm.patchValue({etatSanTroncOther: null})
    }
  }

  onChangeParasiteTroncOther(event) {
    const parasiteOther = this.findObjectParasiteByIdAutres();
    if (parasiteOther && parasiteOther.toString() === event.find(elt => (elt === parasiteOther.toString()))) {
      this.isEtatSanTroncNuisiblesAutres = true;
    } else {
      this.isEtatSanTroncNuisiblesAutres = false;
      this.inventoryForm.patchValue({etatSanTroncNuisiblesAutres: null});
    }
  }

  onChangeEtatSanGeneral(event) {
    if ('other' === event.find(elt => (elt == 'other'))) {
      this.isEtatSanGeneralOther = true;
    } else {
      this.isEtatSanGeneralOther = false;
      this.inventoryForm.patchValue({etatSanGeneralOther: null});
    }
  }

  onChangeAbattage() {
    if (this.inventoryForm.get('abattage').value !== null) {
      this.inventoryForm.patchValue({
        travauxColletMultiple: [],
        travauxTroncMultiple: [],
        travauxHouppierMultiple: [],
        travauxTroncOther: null,
        travauxTroncProtection: null,
        travauxColletOther: null,
        travauxHouppierOther: null
      });
    }
  }

  isChangeTravauxCollet(event) {
    if ('other' === event.find(data => data == 'other')) {
      this.isTravauxColletOther = true;
      return;
    }
    this.isTravauxColletOther = false;
    this.inventoryForm.patchValue({travauxColletOther: ''});
  }

  isChangeTravauxTronc(event) {
    if ('other' === event.find(data => data == 'other')) {
      this.isTravauxTroncOther = true;
    } else {
      this.isTravauxTroncOther = false;
      this.inventoryForm.patchValue({travauxTroncOther: ''});
    }
    if ('protection' === event.find(data => data == 'protection')) {
      this.isTravauxTroncProtection = true
    } else {
      this.isTravauxTroncProtection = false;
      this.inventoryForm.patchValue({travauxTroncProtection: ''});
    }
  }

  isChangeTravauxHouppier(event) {
    if ('other' === event.find(data => data == 'other')) {
      this.isTravauxHouppierOther = true;
      return;
    }
    this.isTravauxHouppierOther = false;
    this.inventoryForm.patchValue({travauxHouppierOther: null});
  }


  findObjectParasiteByIdAutres() {
    return this.parasitesOptions.filter((elt: IOption) => elt.label === 'Autre').map((elt: IOption) => elt.value)[0]
  }

  onChangeEtatSanHouppier(event) {
    if ('champignons-lignivores' === event.find(elt => (elt == 'champignons-lignivores'))) {
      this.isEtatSanHouppierChampignons = true;
    } else {
      this.isEtatSanHouppierChampignons = false;
      this.inventoryForm.patchValue({etatSanHouppierChampignons: []});
    }

    if ('parasite' === event.find(elt => (elt == 'parasite'))) {
      this.isEtatSanHouppierParasites = true;
    } else {
      this.isEtatSanHouppierParasites = false;
      this.inventoryForm.patchValue({etatSanHouppierNuisibles: []});
    }

    if ('other' === event.find((elt: string) => elt == 'other')) {
      this.isEtatSanHouppierOther = true;
    } else {
      this.isEtatSanHouppierOther = false;
      this.inventoryForm.patchValue({etatSanHouppierOther: null})
    }
  }

  onChangeParasiteHouppierOther(event) {
    const parasiteOther = this.findObjectParasiteByIdAutres();
    if (parasiteOther && parasiteOther.toString() === event.find(elt => (elt === parasiteOther.toString()))) {
      this.isEtatSanHouppierNuisiblesAutres = true;
    } else {
      this.isEtatSanHouppierNuisiblesAutres = false;
      this.inventoryForm.patchValue({etatSanHouppierNuisiblesAutres: null});
    }
  }

  onRisqueGeneral(event) {
    if ('other' == event.find(elt => (elt == 'other'))) {
      this.isRisqueGeneralOther = true;
      return;
    }
    this.inventoryForm.patchValue({risqueGeneralOther: ''});
    this.isRisqueGeneralOther = false;
  }

  getEspeces(): void {
    this.especeService.list().toPromise()
      .then((data: Espece[]) => {
        data.map(espece => {
            const cultivar = espece.cultivar === null ? '' : espece.cultivar;
            this.selectOptions = [
              ...this.selectOptions,
              {
                label: espece.genre + ' ' + espece.name + ' ' + cultivar,
                value: espece.id.toString()
              }]
          }
        )
      })
  }

  getChampignons(): void {
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

  isEcheanceChange(event) {
    this.inventoryForm.patchValue({
      userEditedDateTravaux: EcheanceDateService.customDateTravaux(event)
    })
  }

  // UPDATE FORM
  update() {
    if (this.inventoryForm.invalid) {
      this.customAlertService.toastAlert('Certaine valeurs sont incorrectes', 'toast-top-right', 'error');
      return;
    }
    this.initVariables();
    this.inventoryForm.patchValue({
      userEditedDateTravaux: EcheanceDateService.formatToServer(this.inventoryForm.value.userEditedDateTravaux),
      risque: InventaireService.convertRisqueRupture(this.inventoryForm.get('risqueCollet').value, this.inventoryForm.get('risqueTronc').value, this.inventoryForm.get('risqueHouppier').value),
      aestheticIndex: BevaService.getValueColumn(this.inventoryForm.get('aestheticColumn').value, bevaConst.AESTHETIC_INDEX_VALUE),
      healthIndex: BevaService.getValueColumn(this.inventoryForm.get('healthColumn').value, bevaConst.HEALTH_INDEX_VALUE),
      varietyGrade: this.inventoryForm.get('varietyGrade').value ? parseFloat(String(this.inventoryForm.get('varietyGrade').value).replace(/[,]/g, ".")) : null,
      etatSanColletChampignons: this.inventoryForm.get('etatSanColletChampignons').value.length !== 0 ?
        this.inventoryForm.get('etatSanColletChampignons').value.map((val: any) => parseInt(val)) : [],
      etatSanTroncChampignons: this.inventoryForm.get('etatSanTroncChampignons').value.length !== 0 ?
        this.inventoryForm.get('etatSanTroncChampignons').value.map((val: any) => parseInt(val)) : [],
      etatSanHouppierChampignons: this.inventoryForm.get('etatSanHouppierChampignons').value.length !== 0 ?
        this.inventoryForm.get('etatSanHouppierChampignons').value.map((val: any) => parseInt(val)) : []
    });
    this.visibleSpinner = true;
    this.inventaireService.updateInventory(this.inventoryForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.router.navigate([`/admin/inventaires/arbre/${this.activatedRoute.snapshot.paramMap.get('id')}`]);
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Modification impossible', 'toast-top-right', 'error');
      });
  }

  modifImg(position) {
    this.canvasImgVisible = true;
    this.pivotVisible = false;
    this.positionImg = position
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
    this.inventaireService.deleteImgArbre(position, this.inventaire.arbre.id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.successMessage.message = 'Image supprimée avec succès';
        // this.successMessage.show = true;
        this.customAlertService.toastAlert('Image supprimée avec succès', 'toast-top-right', 'success');
        // this.getOneInventaire()
        this.getImageInventaire();
      }, () => {
        this.visibleSpinner = false;
        this.successMessage.show = false;
        this.errorMessage.message = 'Impossible de supprimer l\'image';
        // this.errorMessage.show = true;
        this.customAlertService.toastAlert('Impossible de supprimer l\'image', 'toast-top-right', 'error');
      })
  }

  uploadImage() {
    this.selectedFile = this.uploader.queue;
    if (this.selectedFile.length === 0) {
      return;
    }
    this.visibleSpinner = true;
    return this.inventaireService.uploadImageArbre(this.selectedFile, this.inventaire.arbre.id, this.positionImg)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.canvasImgVisible = false;
        this.uploader.queue = [];
        // this.getOneInventaire()
        this.getImageInventaire();
      }, () => {
        this.errorMessage.message = 'Impossible d\'uploader les images';
        setTimeout(() => {
          this.visibleSpinner = false;
          this.errorMessage.show = true;
        }, 6000);
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
    this.inventaireService.rotateImg(position, this.inventaire.arbre.id, rotation)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.successMessage.message = 'Image pivotée avec succès';
        this.customAlertService.toastAlert('Image pivotée avec succès', 'toast-top-right', 'success');
        // this.successMessage.show = true;
        this.location = true;
        // this.getOneInventaire();
        this.getImageInventaire();
      }, () => {
        this.visibleSpinner = false;
        this.successMessage.show = false;
        this.errorMessage.message = 'Impossible de pivoter l\'image';
        this.customAlertService.toastAlert('Impossible de pivoter l\'image', 'toast-top-right', 'error');
        // this.errorMessage.show = true;
      })
  }

  onChangeValueEspece(event: Espece): void {
    if (!event) return;
    this.inventoryForm.patchValue({
      varietyGrade: event.indiceEspece
    });
  }

}
