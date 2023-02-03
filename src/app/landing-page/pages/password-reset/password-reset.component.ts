import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../app.service';
import {fallIn} from '../../../router.animations';
import {AuthService} from "../../../shared/service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage, SuccessMessage} from "../../../shared/modele/error.interface";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../../../../vendor/styles/pages/authentication.scss'],
  animations: [fallIn()]

})
export class PasswordResetComponent implements OnInit {

  state: any;
  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;
  emailConfirmForm: FormGroup;

  visibleSpinner = false;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.appService.pageTitle = 'Réinitialiser Mot de passe';
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
  }

  initForm() {
    this.emailConfirmForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]]
    })
  }

  confirmPassword() {
    if (this.emailConfirmForm.valid) {
      this.visibleSpinner = true;
      this.authService.sendEmailResetPassword(this.emailConfirmForm.value.email)
        .subscribe(() => {
          this.successMessage.show = true;
          this.successMessage.message = 'Un email vous a été envoyé. Consulter votre boîte aux lettres'
          this.visibleSpinner = false;
        }, () => {
          this.visibleSpinner = false;
          this.successMessage.show = true;
          this.successMessage.message = 'Cet email n\'existe pas';
        })
    }
  }
}
