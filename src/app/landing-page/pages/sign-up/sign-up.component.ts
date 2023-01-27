import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForfaitService } from "../../../admin/gestion-droits/shared/service/forfait.service";
import { AppService } from '../../../app.service';
import { fallIn, moveInLeft, moveInUp } from '../../../router.animations';
import { AuthService } from '../../../shared/service/auth.service';
import { ControlService, PWDREGEX, TELREGEX, ZIPCODEREGEX } from '../../../shared/service/control.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getValidationConfigFromCardNo } from "../../../shared/helpers/card.helper";
import {
  luhnValidator,
  PasswordValidation,
  validateCardExp,
  validateCvC
} from "../../../shared/helpers/customValidatorForm";
import { ErrorMessage, SuccessMessage } from "../../../shared/modele/error.interface";
import { CodePromoService } from '../../../admin/codes-promo/shared/service/code-promo.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../../../vendor/styles/pages/authentication.scss', '../../../../vendor/libs/spinkit/spinkit.scss'],
  animations: [fallIn(), moveInLeft(), moveInUp()]
})
export class SignUpComponent implements OnInit, AfterViewChecked {
  state: any;
  visibleSpinner = false;
  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;
  valueForfait = "GRATUIT";

  forfaitAgile12MOIS = 75;
  forfaitAgile6MOIS = 99;
  forfaitAgile1MOIS = 120;
  originalForfaitAgile12MOIS = 75;
  originalForfaitAgile6MOIS = 99;
  originalForfaitAgile1MOIS = 120;

  codesPostaux = require('codes-postaux');
  cityList: [];

  forfait: any;
  signUpForm: FormGroup;

  step1Visible = true;
  step2Visible = false;
  step3Visible = false;

  constructor(private authService: AuthService,
              private codePromoService: CodePromoService,
              private controlService: ControlService,
              private appService: AppService,
              private route: Router,
              private forfaitService: ForfaitService,
              private fb: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {
    this.appService.pageTitle = 'Inscription';
    this.forfait = this.appService.forfaitPerso;

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
    this.initForm();
    this.resetPriceOnForfaitChange()
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  next() {
    if (this.step1Visible && this.valueForfait != "GRATUIT") {
      // First step
      this.step1Visible = false;
      this.step2Visible = true;
    } else if (this.step2Visible) {
      this.step2Visible = false;
      this.step3Visible = true;
    }
  }

  resetPriceOnForfaitChange(){
    this.signUpForm.get("forfait").valueChanges.subscribe(() => {
      this.forfaitAgile12MOIS = this.originalForfaitAgile12MOIS;
      this.forfaitAgile6MOIS = this.originalForfaitAgile6MOIS;
      this.forfaitAgile1MOIS = this.originalForfaitAgile1MOIS;
      this.signUpForm.get("discount").setValue("")
    })
  }

  validateDiscount() {
    if (this.valueForfait != 'GRATUIT' && this.signUpForm.get("discount").value) {
      this.codePromoService
      .checkCodePromo(this.signUpForm.get("discount").value, this.valueForfait)
      .subscribe({next: (value)=>{
        if (!value.valid) {
          this.signUpForm.get("discount").setErrors({discountError: true})
          this.forfaitAgile12MOIS = this.originalForfaitAgile12MOIS;
          this.forfaitAgile6MOIS = this.originalForfaitAgile6MOIS;
          this.forfaitAgile1MOIS = this.originalForfaitAgile1MOIS;
        }else {
          switch (this.valueForfait) {
            case "Agile_12MOIS":
              this.forfaitAgile12MOIS = Math.round((this.originalForfaitAgile12MOIS - (this.originalForfaitAgile12MOIS * value.reduction) / 100)*10)/10
              break;
            case "Agile_6MOIS":
              this.forfaitAgile6MOIS = Math.round((this.originalForfaitAgile6MOIS - (this.originalForfaitAgile6MOIS * value.reduction) / 100)*10)/10
              break;
            case "Agile_1MOIS":
              this.forfaitAgile1MOIS = Math.round((this.originalForfaitAgile1MOIS - (this.originalForfaitAgile1MOIS * value.reduction) / 100)*10)/10
              break;
            default:
              break;
          }
        }
      }})

    }
  }

  isValidFormStep1() {
    this.valueForfait = this.signUpForm.get('forfait').value;
    return !(this.signUpForm.get('username').errors == null
      && this.signUpForm.get('email').errors == null
      && this.signUpForm.get('forfait').errors == null
      && this.signUpForm.get('password').errors == null
      && this.signUpForm.get('passwordConfirm').errors == null
      && this.signUpForm.get('cguCgv').errors == null
      && this.signUpForm.get('discount').errors == null);
  }

  isValidFormStep2() {
    return !(this.signUpForm.get('name').errors == null
      && this.signUpForm.get('phoneNumber').errors == null
      && this.signUpForm.get('city').errors == null
      && this.signUpForm.get('zipCode').errors == null
      && this.signUpForm.get('address').errors == null);
  }

  previous() {
    if (this.step2Visible) {
      this.step2Visible = !this.step2Visible;
      this.step1Visible = true;
    } else if (this.step3Visible) {
      this.step3Visible = false;
      this.step2Visible = true;
    }
  }

  initForm() {
    this.signUpForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      'email': ['', [Validators.required, Validators.email]],
      'forfait': [this.forfait, [Validators.required]],
      'passwordConfirm': ['', Validators.required],
      'password': ['', [Validators.required, Validators.pattern(PWDREGEX)]],
      'cguCgv': [false, [Validators.required]],
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'phoneNumber': ['', [Validators.required, Validators.pattern(TELREGEX)]],
      'city': ['', [Validators.required]],
      'zipCode': ['', [Validators.required, Validators.pattern(ZIPCODEREGEX)]],
      'address': ['', [Validators.required]],
      'address2': [''],
      'ccNumber': ['', [Validators.required, Validators.minLength(12), luhnValidator()]],
      'nameCard': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'ccCvc': ['', [Validators.required, validateCvC()]],
      'ccExp': ['', [Validators.required, validateCardExp()]],
      'discount': ['', []]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  cardMaskFunction(rawValue: string): Array<RegExp> {
    const card = getValidationConfigFromCardNo(rawValue);
    if (card) {
      return card.mask;
    }
    return [/\d/];
  }

  isDisabled() {
    if (this.step1Visible) {
      return this.isValidFormStep1();
    } else if (this.step2Visible) {
      return this.isValidFormStep2();
    }
  };

  onChangeZipCode() {
    this.cityList = this.codesPostaux.find(this.signUpForm.value.zipCode);
  }

  onSubmit() {
    if (this.signUpForm.invalid && this.valueForfait != "GRATUIT") {
      return;
    }
    this.visibleSpinner = true;
    this.authService.signUp(this.signUpForm.value)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.successMessage.show = true;
        this.successMessage.message = "Inscription effectuée avec succès, vous pouvez vous connecter.";
        setTimeout(() => {
          this.successMessage.show = false;
        }, 10000);
        this.signUpForm.reset();
        this.step1Visible = true;

      }, (response: any) => {
        this.visibleSpinner = false;
        this.errorMessage.show = false;
        this.errorMessage.show = true;

        if (response.errorCode != 200) {
          this.errorMessage.message = response;
        }
        if (response.errorCode != 200 && (response == "user already exist" || response == "groupe already defined")) {
          this.errorMessage.message = "Le compte associé à l’email existe déjà";
        }

        setTimeout(() => {
          this.errorMessage.show = false;
        }, 10000);

      })
  }
}
