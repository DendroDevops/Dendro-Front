import {Component, OnInit} from '@angular/core';
import {ControlService, PWDREGEX} from '../../../shared/service/control.service';
import {AuthService} from '../../../shared/service/auth.service';
import {Router} from '@angular/router';
import {fallIn, moveInLeft, moveInUp} from '../../../router.animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage, SuccessMessage} from "../../../shared/modele/error.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../../../vendor/styles/pages/authentication.scss',
    '../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  animations: [fallIn(), moveInLeft(), moveInUp()]
})

export class LoginComponent implements OnInit {
  // ERROR SERVER
  visibleSpinner = false;

  passwordVisible = false;
  state: any;

  errorMessage: ErrorMessage;
  successMessage: SuccessMessage;

  loginForm: FormGroup;

  constructor(
    private controlService: ControlService,
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder) {

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

  // INIT SERVER

  initForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(PWDREGEX)]]
    });
  }

  isPasswordVisible() {
    return this.passwordVisible ? this.passwordVisible = false : this.passwordVisible = true;
  }

  onLogin() {
    // CONTROL FORM IF STATEMENT TRUE
    this.visibleSpinner = true;

    if (this.loginForm.invalid) {
      this.visibleSpinner = false;
      this.errorMessage.show = true;
      this.errorMessage.message = 'Email ou mot de passe invalide'
    } else {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((response: any) => {
          this.visibleSpinner = false;
          this.errorMessage.show = false;
          localStorage.setItem('token', response.token);
          this.route.navigate(['/admin/accueil']);
        }, err => {
          this.visibleSpinner = false;
          this.errorMessage.show = true;
          this.errorMessage.message = 'Email ou mot de passe invalide';
        })
    }
  }

}
