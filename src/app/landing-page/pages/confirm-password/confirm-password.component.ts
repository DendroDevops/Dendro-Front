import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PWDREGEX} from "../../../shared/service/control.service";
import {PasswordValidation} from "../../../shared/helpers/customValidatorForm";
import {ErrorMessage, SuccessMessage} from "../../../shared/modele/error.interface";
import {fallIn, moveInLeft, moveInUp} from "../../../router.animations";
import {JwtHelperService} from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss', '../../../../vendor/styles/pages/authentication.scss'],
  animations: [fallIn(), moveInLeft(), moveInUp()]
})
export class ConfirmPasswordComponent implements OnInit {

  emailConfirmForm: FormGroup;

  visibleSpinner = false;

  state: any;
  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {

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
    this.onVerifyToken();
    this.initForm()
  }

  initForm() {
    this.emailConfirmForm = this.fb.group({
      'password': ['', [Validators.required, Validators.pattern(PWDREGEX)]],
      'passwordConfirm': ['', Validators.required],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onVerifyToken() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    if (token !== null) {
      this.visibleSpinner = true;
      this.authService.verifyToken(token)
        .subscribe(() => {
          this.visibleSpinner = false;
        }, () => {
          this.visibleSpinner = false;
          this.router.navigateByUrl("['/error-404']");
        })
    }
  }

  resetPassword() {
    const decodeToken = helper.decodeToken(this.activatedRoute.snapshot.paramMap.get('token'));
    if (this.emailConfirmForm.valid && !isNaN(decodeToken.data.id)) {
      this.visibleSpinner = true;
      this.authService.resetPassword(decodeToken.data.id, this.emailConfirmForm.value.password, this.emailConfirmForm.value.passwordConfirm)
        .subscribe(() => {
          this.visibleSpinner = false;
          this.successMessage.show = true;
          this.successMessage.message = 'Votre mot de passe a été modifié'
          this.emailConfirmForm.reset();
        }, () => {
          this.visibleSpinner = false;
          this.errorMessage.show = true;
          this.errorMessage.message = 'Impossible de modifier le mot de passe'
        })
    }
  }
}
