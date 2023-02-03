import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../../shared/service/auth.service';

import {Bounds, CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {fallIn, moveInUp} from '../../../../router.animations';
import {AppService} from '../../../../app.service';
import * as userConst from "../../shared/constant/user.constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TELREGEX, ZIPCODEREGEX} from "../../../../shared/service/control.service";
import {ErrorMessage, SuccessMessage} from "../../../../shared/modele/error.interface";
import {CustomAlertService} from "../../../../customAlertService.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupeService} from "../../shared/service/groupe.service";
import {DataConst} from "../../../inventaires/shared/constant/inventaire.constants";
import {ERROR_MESSAGE_CONST} from "../../../../shared/constants/error-message.const";
import * as moment from 'moment';
import {UserService} from "../../shared/service/user.service";
import {luhnValidator, validateCardExp, validateCvC} from "../../../../shared/helpers/customValidatorForm";
import {getValidationConfigFromCardNo} from "../../../../shared/helpers/card.helper";
import {UserModele} from "../../shared/model/user";

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: [
    '../../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../../vendor/styles/pages/account.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    './my-profil.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class MyProfilComponent implements OnInit {
  errorDataMessage: DataConst[] = ERROR_MESSAGE_CONST;

  TEXT = ERROR_MESSAGE_CONST.find(elt => elt.name == 'MODIF_FORFAIT_ERROR').displayName;
  croppedWidth: number;
  croppedHeight: number;

  groupeTypes = userConst.USER_GROUPE_TYPE;
  codesPostaux = require('codes-postaux');
  cityList: [];
  user: UserModele;

  state: any;
  // IMAGE CROPPER
  cropperSettings: CropperSettings;
  data: any;
  selectedFile: any;
  @ViewChild('cropper', /* TODO: add static flag */ undefined)
  cropper: ImageCropperComponent;

  ForfaitForm: FormGroup;
  formGroupCompte: FormGroup;

  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  visibleSpinner = false;
  isVisibleForfait = false;
  username = '';
  password = '';

  forfait = '';

  isChangingForfait = false;

  codeForfaitBase: String = '';
  isChangingPayMode: Boolean = false;

  croppedImage: any = '';

  constructor(
    public authService: AuthService,
    public appService: AppService,
    private fb: FormBuilder,
    public customAlertService: CustomAlertService,
    private modalService: NgbModal,
    private groupeService: GroupeService,
    private userService: UserService
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 315;
    this.cropperSettings.height = 210;
    this.cropperSettings.croppedWidth = 315;
    this.cropperSettings.croppedHeight = 210;
    this.cropperSettings.canvasWidth = 315;
    this.cropperSettings.canvasHeight = 210;
    this.cropperSettings.fileType = 'image/png';
    this.data = {};

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
    this.getOneUser();
  }

  // IMAGE LISTENER
  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    this.selectedFile = file;
  }

  fileChangeBeta($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
    this.selectedFile = file;
  }


  telecharger(id) {
    this.visibleSpinner = true;
    this.userService.uploadImage(id, this.selectedFile, this.user.username)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.data = '';
        this.customAlertService.toastAlert('Modification effectuée avec succès', 'toast-top-right', 'success');
        this.getOneUser();
      }, (err: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'success');
      });
  }

  getWordAccomodateForfait(codeForfait) {
    if (codeForfait == '1M') {
      return '120 € T.T.C./mois'
    } else if (codeForfait == '6M') {
      return ' 99 € T.T.C./mois'
    } else if (codeForfait == '12M') {
      return '75 € T.T.C./mois'
    } else {
      return '';
    }
  }

  initForm() {
    this.ForfaitForm = this.fb.group({
      'forfait': [this.user.groupe.forfait && this.user.groupe.forfait.codeForfait, [Validators.required]],
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'phoneNumber': ['', [Validators.required, Validators.pattern(TELREGEX)]],
      'city': ['', [Validators.required]],
      'zipCode': ['', [Validators.required, Validators.pattern(ZIPCODEREGEX)]],
      'address': ['', [Validators.required]],
      'address2': [''],
      'changingMode': [this.codeForfaitBase === 'GRATUIT', [Validators.required]],
      'ccNumber': ['', [Validators.required, Validators.minLength(12), luhnValidator()]],
      'nameCard': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'ccCvc': ['', [Validators.required, validateCvC()]],
      'ccExp': ['', [Validators.required, validateCardExp()]]
    });

    this.formGroupCompte = this.fb.group({
      'nom': [this.user.nom],
      'prenom': [this.user.prenom],
      'email': [this.user.email, [Validators.required, Validators.email]],
      'username': [this.user.username, [Validators.required]],
      'groupe': [this.user.groupe.name, [Validators.required]],
      'numCertification': [this.user.groupe.numCertification],
      'cp': [this.user.groupe.cp, [Validators.required, Validators.pattern(ZIPCODEREGEX)]],
      'ville': [this.user.groupe.ville, [Validators.required]],
      'siret': [this.user.groupe.siret],
      'addressSociete': [this.user.groupe.addressSociete],
      'nameSociete': [this.user.groupe.nameSociete]
    })
    this.cityList = this.codesPostaux.find(this.formGroupCompte.value.cp);
  }

  cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

  changingPayMode() {
    this.isChangingPayMode = this.ForfaitForm.value.changingMode ? !this.isChangingPayMode : !this.isChangingPayMode;
  }

  onSubmit() {
    const MESSAGE_INFOS_REQUIRED = 'Vérifiez bien que tous les champs sont remplis';
    if (!this.user.id || !this.ForfaitForm.value.forfait) {
      return;
    }

    if (this.ForfaitForm.value.changingMode) {
      if (this.ForfaitForm.value.forfait != 'GRATUIT' || !this.ForfaitForm.value.forfait) {
        if (this.ForfaitForm.invalid) {
          this.customAlertService.toastAlert(MESSAGE_INFOS_REQUIRED, 'toast-top-right', 'error');
          return;
        }

        if (!this.ForfaitForm.value.zipCode || !this.ForfaitForm.value.city) {
          this.customAlertService.toastAlert(MESSAGE_INFOS_REQUIRED, 'toast-top-right', 'error');
          return;
        }
      }
    }

    const messageSuccess = 'Modification effectuée avec succès. Déconnectez vous pour que toutes les modifications soient prises en compte';

    this.visibleSpinner = true;
    this.userService.updateCurrencyModeWithSrippe(this.ForfaitForm.value, this.user.id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.successMessage.show = false;
        this.customAlertService.toastAlert(messageSuccess, 'toast-top-right', 'success');
        this.getOneUser();
        this.ForfaitForm.reset()
      }, (err: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      })
  }

  onChangeZipCode(mode = 'forfait') {
    this.cityList = (mode != 'forfait') ?
      this.codesPostaux.find(this.formGroupCompte.value.cp) : this.codesPostaux.find(this.ForfaitForm.value.zipCode);
  }

  getOneUser() {
    const decodetoken = this.authService.decodeToken;
    this.userService.read(decodetoken.data.id)
      .subscribe((data: UserModele) => {
        this.user = data;
        this.codeForfaitBase = MyProfilComponent.getForFaitCodeBase(this.user);
        this.user.groupe.groupeType = MyProfilComponent.groupeTypeDisplayName(data.groupe.groupeType, this.groupeTypes);
        this.initForm();
        this.isChangingForfait = this.user.groupe.isStripped;
        this.isChangingPayMode = this.codeForfaitBase === 'GRATUIT';
      }, () => {
      });
  }

  static getForFaitCodeBase(user: UserModele) {
    if (!user.groupe.forfait) return null;
    return (user.groupe.forfait.codeForfait === '1M_FREE') ? '1M' : user.groupe.forfait.codeForfait;
  }

  public static groupeTypeDisplayName(data: string, tab: any): string {
    return tab.find(obj => obj.name == data) ?
      tab.find(obj => obj.name == data).displayName :
      '';
  }

  curTab = 'general';

  languages = [
    {value: 'English', label: 'English'},
    {value: 'German', label: 'German'},
    {value: 'French', label: 'French'}
  ];

  accountData = {
    avatar: '5-small.png',
    name: 'Nelle Maxwell',
    username: 'nmaxwell',
    email: 'nmaxwell@mail.com',
    company: 'Company Ltd.',
    verified: false,

    info: {
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.',
      birthday: 'May 3, 1995',
      country: 'Canada',
      languages: ['English'],
      phone: '+0 (123) 456 7891',
      website: '',
      music: ['Rock', 'Alternative', 'Electro', 'Drum & Bass', 'Dance'],
      movies: ['The Green Mile', 'Pulp Fiction', 'Back to the Future', 'WALL·E', 'Django Unchained', 'The Truman Show', 'Home Alone', 'Seven Pounds'],

      twitter: 'https://twitter.com/user',
      facebook: 'https://www.facebook.com/user',
      google: '',
      linkedin: '',
      instagram: 'https://www.instagram.com/user'
    },

    notifications: {
      comments: true,
      forum: true,
      followings: false,
      news: true,
      products: false,
      blog: true
    }
  };

  changeForfait() {
    this.isVisibleForfait = !this.isVisibleForfait;
  }

  onUnsubscribe() {
    this.visibleSpinner = true;
    this.userService.unsubscribe(this.user.id)
      .subscribe((res: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(res.message, 'toast-top-right', 'success');
      }, err => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      })
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  modifCompte() {

    if (this.formGroupCompte.invalid) {
      return;
    }
    this.visibleSpinner = true;
    this.userService.updateUserProfil(this.formGroupCompte.value, this.user.id)
      .subscribe(() => {
        if (!this.data.image) {
          this.getOneUser();
          this.customAlertService.toastAlert('Modification effectuée avec succès', 'toast-top-right', 'success');
          this.visibleSpinner = false;
        } else {
          this.groupeService.uploadImg(this.user.groupe.id, this.convertBase64toFile(this.data.image)).subscribe(() => {
            this.customAlertService.toastAlert('Modification effectuée avec succès', 'toast-top-right', 'success');
            this.visibleSpinner = false;
          }, err => {
            this.customAlertService.toastAlert(err, 'toast-top-right', 'error')
            this.visibleSpinner = false;
          });
        }
      }, (err: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
      })
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then(() => {
    }, () => {
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  isForfaitValide(): boolean {
    // If forfait is Gratuit
    /**
     * return true when user is in right period to
     * unsubscribe or change his forfait
     */
    if (this.codeForfaitBase == 'GRATUIT') {
      return true;
    }
    if (!this.user.groupe.dateEcheance) {
      return false;
    }
    const STARTDATE = moment(moment().format());
    const dateEcheanche = moment(this.user.groupe.dateEcheance);
    return dateEcheanche.diff(STARTDATE, 'days', true) <= 2;
  }

  convertBase64toFile(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  };

}
