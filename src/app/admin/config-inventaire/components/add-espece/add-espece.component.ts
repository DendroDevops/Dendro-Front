import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as customValidators from '../../../../shared/helpers/customValidatorForm';
import {Espece} from "../../shared/model/espece.interface";
import {EspeceService} from "../../shared/service/espece.service";
import {CustomAlertService} from "../../../../customAlertService.service";

@Component({
  selector: 'app-add-espece',
  templateUrl: './add-espece.component.html',
  styleUrls: ['./add-espece.component.scss']
})
export class AddEspeceComponent implements OnInit {

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  VALID_PATTERN_FLOAT = customValidators.VALID_PATTERN_FLOAT;
  especeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private especeService: EspeceService,
              private customAlertService: CustomAlertService
  ) {
  }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.especeForm = this.fb.group({
      'name': ['', Validators.required],
      'cultivar': [''],
      'genre': ['', Validators.required],
      'nomFr': ['',],
      'categorie': [''],
      'tarif': [null, [Validators.pattern(this.VALID_PATTERN_FLOAT)]]
    })
  }

  onAdd() {
    this.visibleSpinner.emit(true);
    if (this.especeForm.invalid) {
      this.visibleSpinner.emit(false);
      this.customAlertService.toastAlert('data not conform', 'toast-top-right', 'error');
      return;
    }
    this.especeForm.value.tarif = parseInt(this.especeForm.value.tarif ? this.especeForm.value.tarif : 0);
    this.especeService.create(this.especeForm.value)
      .subscribe((data: Espece) => {
        this.visibleSpinner.emit(false);
        this.customAlertService.toastAlert('Enregistrement effectué avec succès', 'toast-top-right', 'success');
        this.list.emit(true);
      }, () => {
        this.visibleSpinner.emit(false);

        this.customAlertService.toastAlert('Impossible d\' enrégistrer l\'essence', 'toast-top-right', 'error');
      });
  }

}
