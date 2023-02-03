import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from '../../../../app.service';
import {CustomAlertService} from '../../../../customAlertService.service';

import {fallIn, moveInUp} from '../../../../router.animations';
import {ProfilModele} from '../../shared/model/profil';
import {ActivatedRoute, Router} from '@angular/router';
import * as userConst from "../../shared/constant/user.constants";
import {ProfilService} from "../../shared/service/profil.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DroitModele} from "../../shared/model/droit";
import {DroitService} from "../../shared/service/droit.service";
import {IOption} from "ng-select";

@Component({
  selector: 'app-detail-profil',
  templateUrl: './detail-profil.component.html',
  styleUrls: [
    './detail-profil.component.scss',
    '../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})
export class DetailProfilComponent implements OnInit {

  state: any;
  visibleSpinner = false;

  groupeTypes = userConst.USER_GROUPE_TYPE;
  // PROFIL UPDATE
  profil: ProfilModele;
  droitOptions: Array<IOption> = [];
  // ITEM UPDATE
  droits: any[] = [];
  profilForm: FormGroup;

  constructor(
    public appService: AppService,
    private customAlertService: CustomAlertService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private profilService: ProfilService,
    private fb: FormBuilder,
    private droitService: DroitService
  ) {
  }

  ngOnInit() {
    this.getArrayDroits();
    this.initForm();
  }


  initForm() {
    this.profilForm = this.fb.group({
      'id': ['', Validators.required],
      'name': ['', Validators.required],
      'droit': ['', Validators.required],
      'groupeType': ['', Validators.required]
    });
    this.getProfil();
  }

  getArrayDroits() {
    this.droitService.list()
      .subscribe((data: DroitModele[]) => {
        data.map((droit: DroitModele) => {
          this.droitOptions = [
            ...this.droitOptions,
            {
              label: droit.name,
              value: droit.id.toString()
            }
          ]
        });
      });
  }

  getProfil() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.profilService.read(parseInt(id))
      .subscribe((data: ProfilModele) => {
        this.profil = data;
        this.profilForm.setValue({
          id: data.id,
          name: data.name,
          droit: data.droit.id.toString(),
          groupeType: data.groupeType
        });
      }, () => {
      })
  }

  update() {
    // UPDATE DROIT
    if (this.profilForm.invalid) return;
    this.visibleSpinner = true;
    this.profilService.update(this.profilForm.value)
      .subscribe((data: any) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(data.message, 'toast-top-right', 'success');
        this.route.navigate([`/admin/gestion-droits/profil`]);
      }, (err) => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert(err, 'toast-top-center', 'error');
      });
  }
}
