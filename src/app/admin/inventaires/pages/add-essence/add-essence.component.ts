import {Component, OnInit} from '@angular/core';
import {InventaireService} from "../../shared/service/inventaire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorMessage, SuccessMessage} from "../../../../shared/modele/error.interface";
import {Inventaire} from "../../shared/model/inventaire.interface";
import {Essence} from "../../shared/model/essence.interface";
import {Espece} from "../../../config-inventaire/shared/model/espece.interface";

import {fallIn, moveInUp} from "../../../../router.animations";
import {IOption} from "ng-select";
import * as inventoryConst from "../../shared/constant/woodArea.constant";
import {EssenceService} from "../../shared/service/essence.service";
import {FileUploader} from "ng2-file-upload";
import {EcheanceDateService} from "../../shared/service/echeance-date.service";
import {EspeceService} from "../../../config-inventaire/shared/service/espece.service";
import {ChampignonsService} from "../../../config-inventaire/shared/service/champignons.service";
import {Champignons} from "../../../config-inventaire/shared/model/Champignons";
import {NuisibleService} from "../../../config-inventaire/shared/service/nuisible.service";
import {Nuisible} from "../../../config-inventaire/shared/model/nuisible.interface";
import {BevaService} from "../../shared/service/beva.service";
import * as bevaConst from "../../shared/constant/beva.const";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const now = new Date();

@Component({
  selector: 'app-add-essence',
  templateUrl: './add-essence.component.html',
  styleUrls: [
    './add-essence.component.scss',
    '../../../../../vendor/libs/ng2-archwizard/ng2-archwizard.scss',
    '../../../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss',
    '../../../../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss'
  ],
  animations: [moveInUp(), fallIn()]
})
export class AddEssenceComponent implements OnInit {

  state: any;
  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;
  visibleSpinner = false;

  inventaire: Inventaire;
  especeData: any;
  especeDatas: Espece[] = [];


  caractOptions: IOption[] = [];
  isCaractOther: boolean = false;
  isCritereCom: boolean = false;

  stadeDevOptions: IOption[] = [];
  houppierOptions: IOption[] = [];
  critereOptions: IOption[] = [];

  domaineOptions: IOption[] = [];

  nuisanceOptions: IOption[] = [];
  proximiteOptions: IOption[] = [];
  isProximiteOther = false;

  proximiteWithDictOptions: IOption[] = [];

  tauxFreqOptions: IOption[] = [];

  typePassageOptions: IOption[] = [];
  isTypePassageOther = false;

  accessibiliteOptions: IOption[] = [];
  accessibiliteOther: string = '';
  isAccessibiliteOther = false;

  etatGeneralOptions: IOption[] = [];
  etatGeneral: string [] = [];

  champignonsOptions: IOption[] = [];
  isHealthDiagChampignons = false;

  etatGeneralChampignonsOptions: any = [];
  etatGeneralParasiteOptions: any = [];

  etatSanGeneralParasite: string[] = [];
  isHealthDiagParasite = false;
  parasitesOptions: IOption[] = [];

  isHealthDiagParasiteOther = false;
  etatSanGeneralOther: string = '';
  isHeathDiagOther = false;

  risqueOptions: IOption[] = [];
  nbreSujetConcerne: number;

  travauxOptions: IOption[] = [];
  isTravauxOther = false;
  isTravauxSoin = false;

  isTravauxProtection = false;

  dateTravauxOptions: IOption[] = [];
  // CALCUL BEVA
  // UPLOAD
  idEssence: any;
  essence: Essence;
  firstStep: boolean = true;
  selectedFile: any;

  essenceForm: FormGroup;
  isEtatSanChampignonsAutres: boolean = false

  constructor(
    private inventaireService: InventaireService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private essenceService: EssenceService,
    private especeService: EspeceService,
    private champignonsService: ChampignonsService,
    private nuisibleService: NuisibleService,
    private fb: FormBuilder
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

  uploader = new FileUploader({
    url: '',
    authTokenHeader: 'authorization',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    queueLimit: 3,
    disableMultipart: true,
  });
  hasBaseDropZoneOver = false;

  fileOver(e: any) {
    const file: File = e.target.files[0];
    // const file: File = e[0].target;
    this.hasBaseDropZoneOver = e;
    this.selectedFile = e;
  }

  ngOnInit() {
    this.getInventaire();

    this.autoCompleteSelectOptions();
  }

  initForm() {
    this.essenceForm = this.fb.group({
      // Identification
      espece: ['', Validators.required],
      diametre: [null, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      hauteur: [null, [Validators.required, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')]],
      countSubject: [null, [Validators.required, Validators.pattern('^\\d{1,}$')]],
      codeSite: [''],
      numSujet: [''],

      // caracteristiques
      caract: [''],
      caractOther: [''],
      stadeDev: [''],
      houppier: [''],
      critere: [[]],
      critereCom: [''],

      // Environment
      domaine: [''],
      nuisance: [[]],
      proximite: [[]],
      proximiteOther: [''],
      proximiteWithDict: [[]],
      tauxFreq: [''],
      typePassage: [[]],
      typePassageOther: [''],
      accessibilite: [''],
      accessibiliteOther: [''],

      // diagnostic sanitaire
      etatGeneral: [[]],
      etatSanGeneralChampignons: [[]],
      etatSanGeneralChampignonsAutres: [''],
      etatSanGeneralParasite: [[]],
      etatSanGeneralParasiteAutres: [''],
      etatSanGeneralOther: [''],
      risque: [''],

      // Travaux
      nbreSujetConcerne: [null, Validators.pattern('^\\d{1,}$')],
      travaux: [[]],
      travauxOther: [''],
      travauxSoin: [''],
      travauxProtection: [''],

      dateTravaux: [''],
      userEditedDateTravaux: [''],

      // beva index
      varietyGrade: [null, Validators.pattern('^[1-9]\\d*(?:\\.\\d+)?$')],
      locationIndex: [''],
      healthColumn: [''],
      aestheticColumn: [''],
      healthIndex: [''],
      aestheticIndex: [''],
      beva: [''],
      epaysage: [this.inventaire.epaysage.id],
      id: [null]
    });
  }

  onFileSelected($event) {
    const file: File = $event.target.files[0];
    this.selectedFile = file;
  }

  add() {
    // ADD ESSENCE MEANS TO UPDATE INVENTORY
    if (this.essenceForm.invalid) return;
    // GET PAYLOAD
    this.essenceForm.patchValue({
      countSubject: this.essenceForm.get('countSubject').value && parseInt(this.essenceForm.get('countSubject').value),
      diametre: this.essenceForm.get('diametre').value && parseInt(this.essenceForm.get('diametre').value),
      hauteur: this.essenceForm.get('hauteur').value && parseInt(this.essenceForm.get('hauteur').value)
    });

    this.essenceService.create(this.essenceForm.value)
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this.idEssence = data.id;
        this.addImage(this.idEssence);
        this.getEssence();
        this.firstStep = false;
      }, (err) => {
        this.errorMessage.show = true;
        this.errorMessage.message = err;
        setTimeout(() => {
          this.errorMessage.show = false;
        }, 5000);
        this.visibleSpinner = false;
      });
  }

  getEssence() {
    this.essenceService.read(this.idEssence)
      .subscribe((data: Essence) => {
        this.essence = data;
      }, (err) => {
        this.errorMessage.show = true;
        this.errorMessage.message = err;
        setTimeout(() => {
          this.errorMessage.show = false;
        }, 5000);
        this.visibleSpinner = false;
      });
  }

  finish() {
    // Set essence
    this.essenceForm.patchValue({
      userEditedDateTravaux: EcheanceDateService.formatToServer(this.essenceForm.get('userEditedDateTravaux').value),
      varietyGrade: this.essenceForm.get('varietyGrade').value && parseFloat(this.essenceForm.get('varietyGrade').value),
      locationIndex: this.essenceForm.get('locationIndex').value && parseInt(this.essenceForm.get('locationIndex').value),
      healthIndex: BevaService.getValueColumn(this.essenceForm.get('healthColumn').value, bevaConst.HEALTH_INDEX_VALUE),
      aestheticIndex: BevaService.getValueColumn(this.essenceForm.get('aestheticColumn').value, bevaConst.AESTHETIC_INDEX_VALUE),

      etatSanGeneralChampignons: this.essenceForm.get('etatSanGeneralChampignons').value.length !== 0 ? this.essenceForm.get('etatSanGeneralChampignons').value.map((val: any) => parseInt(val)) : [],
      etatSanGeneralParasite: this.essenceForm.get('etatSanGeneralParasite').value.length !== 0 ? this.essenceForm.get('etatSanGeneralParasite').value.map((val: any) => parseInt(val)) : [],
      id: this.idEssence
    });

    this.essenceService.update(this.essenceForm.value)
      .subscribe(() => {
        this.router.navigate([`/admin/inventaires/essence/${this.idEssence}`]);
      }, (err) => {
        this.errorMessage.show = true;
        this.errorMessage.message = err;
        setTimeout(() => {
          this.errorMessage.show = false;
        }, 5000);
        this.visibleSpinner = false;
      })
  }

  addImage(idEssence: any) {
    this.selectedFile = this.uploader.queue;
    if (this.selectedFile.length === 0) {
      return;
    }
    this.visibleSpinner = true;
    return this.essenceService.addImgEssence(this.selectedFile, idEssence)
      .subscribe(() => {
        this.visibleSpinner = false;
      }, () => {
        this.errorMessage.show = true;
        this.errorMessage.message = 'Impossible d\'uploader les images';
        setTimeout(() => {
          this.successMessage.show = false;
        }, 6000);
      })
  }

  getInventaire() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.inventaireService.read(parseInt(id))
      .subscribe((data: Inventaire) => {
        this.inventaire = data;
        this.getChampignons();
        this.getParasites();
        this.initForm();
      }, () => {
      })
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
          res.name = 'Parasite, Autre, précisez';
          res.code = 'Autre';
        });
        data.map((elt: Nuisible) => {
            this.parasitesOptions = [
              ...this.parasitesOptions,
              {
                label: elt.name,
                value: elt.id.toString()
              }]
          }
        )
      })
  }

  autoCompleteSelectOptions() {
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

  isCaractOtherChange(event) {
    this.essenceForm.patchValue({caractOther: ''})
    this.isCaractOther = event === 'other';
  }

  isCritereComChange(event) {
    this.essenceForm.patchValue({critereCom: ''});
    this.isCritereCom = ('comment' === event.find(val => val == 'comment'));
  }

  isProximiteChange(event) {
    this.essenceForm.patchValue({proximiteOther: ''});
    this.isProximiteOther = ('other' === event.find(val => val == 'other'));
  }

  isTypePassageChange(event) {
    this.essenceForm.patchValue({typePassageOther: ''});
    this.isTypePassageOther = ('other' === event.find(val => val == 'other'));
  }

  isAccessibiliteChange(event) {
    this.essenceForm.patchValue({accessibiliteOther: ''});
    this.isAccessibiliteOther = event == 'other';
  }

  isTravauxChange(event) {
    if ('other' === event.find(val => val == 'other')) {
      this.isTravauxOther = true;
    } else {
      this.isTravauxOther = false;
      this.essenceForm.patchValue({travauxOther: null});
    }

    if ('protection-particuliere-precisez' === event.find(val => val == 'protection-particuliere-precisez')) {
      this.isTravauxProtection = true;
    } else {
      this.isTravauxProtection = false;
      this.essenceForm.patchValue({travauxProtection: null});
    }

    if ('soin-particulier-precisez' === event.find(val => val == 'soin-particulier-precisez')) {
      this.isTravauxSoin = true;
    } else {
      this.isTravauxSoin = false;
      this.essenceForm.patchValue({travauxSoin: null});
    }
  }

  isHeathDiagChange(event): void {
    if ('comment' === event.find(val => val == 'comment')) {
      this.isHeathDiagOther = true;
    } else {
      this.isHeathDiagOther = false;
      this.essenceForm.patchValue({etatSanGeneralOther: null});
    }

    if ('champignons-lignivores' === event.find(val => val == 'champignons-lignivores')) {
      this.isHealthDiagChampignons = true;
    } else {
      this.isHealthDiagChampignons = false;
      this.essenceForm.patchValue({etatSanGeneralChampignons: []});
    }

    if ('parasite' === event.find(val => val == 'parasite')) {
      this.isHealthDiagParasite = true;
    } else {
      this.isHealthDiagParasite = false;
      this.essenceForm.patchValue({etatSanGeneralParasite: []});
    }
  }

  findObjectParasiteByIdAutres() {
    return this.parasitesOptions.filter((elt: IOption) => elt.label === 'Parasite, Autre, précisez').map((elt: IOption) => elt.value)[0]
  }

  isHealthDiagNuisibleOther(event) {
    const parasiteOther = this.findObjectParasiteByIdAutres();
    if (parasiteOther.toString() === event.find(elt => (elt === parasiteOther.toString()))) {
      this.isHealthDiagParasiteOther = true;
    } else {
      this.isHealthDiagParasiteOther = false;
      this.essenceForm.patchValue({etatSanGeneralParasiteAutres: null});
    }
  }

  isEcheanceChange(event: string): void {
    this.essenceForm.patchValue({userEditedDateTravaux: EcheanceDateService.customDateTravaux(event)});
  }

  onChangeEtatSanChampignonsOther(event) {
    let data: IOption = this.champignonsOptions.find((elt: IOption) => elt.label == 'Je ne sais pas');
    this.isEtatSanChampignonsAutres = !!event.find((elt: string) => elt == data.value);
  }

  onChangeValueEspece(event: Espece): void {
    if (!event) return;
    this.essenceForm.patchValue({
      varietyGrade: event.indiceEspece
    });
  }
}

