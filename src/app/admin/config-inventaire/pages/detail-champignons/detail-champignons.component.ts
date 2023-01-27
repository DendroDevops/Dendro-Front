import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fallIn, moveInUp } from '../../../../router.animations';
import { AppService } from '../../../../app.service';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from '../../../../shared/service/control.service';
import { CustomAlertService } from '../../../../customAlertService.service';
import { Champignons } from "../../shared/model/Champignons";
import { ChampignonsService } from "../../shared/service/champignons.service";
import * as champignonsConst from "../../shared/constant/champignons.constants";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
0
@Component({
  selector: 'app-detail-champignons',
  templateUrl: './detail-champignons.component.html',
  styleUrls: [
    './detail-champignons.component.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'],
  animations: [moveInUp(), fallIn()],
  encapsulation: ViewEncapsulation.None
})
export class DetailChampignonsComponent implements OnInit {

  state: any;
  visibleSpinner = true;
  champignon: Champignons;
  originalChampignon: Champignons = null;

  categories = champignonsConst.CHAMPIGNONS_GROUPE_TYPE;
  champignonForm: FormGroup;
  files: { name: string, file: File }[] = []

  constructor(
    public appService: AppService,
    private activedRoute: ActivatedRoute,
    private controlService: ControlService,
    private customAlertService: CustomAlertService,
    private champignonsService: ChampignonsService,
    private fb: FormBuilder,
  ) {
    this.appService.pageTitle = 'Detail champignons';
  }

  ngOnInit() {
    this.getOneChamp();
    this.initForm()
  }

  initForm() {
    this.champignonForm = this.fb.group({
      'name': ['', Validators.required],
      'attaqueF': ['',],
      'attaqueR': ['',],
      'category': ['', Validators.required],
    });
    this.getOneChamp();
  }

  getOneChamp() {
    this.visibleSpinner = true;
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.champignonsService.read(parseInt(id))
      .subscribe((data: Champignons) => {
        this.visibleSpinner = false;
        this.originalChampignon = JSON.parse(JSON.stringify(data));
        this.champignon = { ...data, imgUrl: { img1: '', img2: '', ...data.imgUrl } };
        this.champignonForm.setValue({
          name: data.name,
          attaqueF: data.attaqueF,
          attaqueR: data.attaqueR,
          category: data.category
        });
        // Changer la valeur en url complet
        for (const imgKey in this.champignon.imgUrl) {
          if (Object.prototype.hasOwnProperty.call(this.champignon.imgUrl, imgKey)) {
            const element = this.champignon.imgUrl[imgKey];
            if (element) {
              this.champignon.imgUrl[imgKey] = this.appService.urlBase + 'images/champignons/' + element;
            }
          }
        }
      });
  }

  modifier() {
    this.visibleSpinner = true;
    const id = this.activedRoute.snapshot.paramMap.get('id');
    let data = this.champignonForm.value;
    this.champignonsService.update({ id: +id, category: data.category, name: data.name, attaqueF: data.attaqueF, attaqueR: data.attaqueR })
      .subscribe((res) => {
        this.originalChampignon = res
        for (const image of this.files) {
          this.champignonsService.uploadImage(+id, image).subscribe(res => this.originalChampignon = res)
        }
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Modification effectuée avec succès', 'toast-top-right', 'success');
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Impossible de modifier', 'toast-top-right', 'error');
      });
  }

  supprimerImage(imgKey: string) {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.champignon.imgUrl[imgKey] = "";
    this.files = this.files.filter(file => { file.name !== imgKey });
    if (this.originalChampignon.imgUrl[imgKey]) {
      this.champignonsService.deleteImage(+id, this.originalChampignon.imgUrl[imgKey]).subscribe();
    }
  }

  onFileSelected($event, imgKey: string) {

    const file: File = $event.target.files[0];
    this.files.push({ name: imgKey, file })

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (_event) => {
      this.champignon.imgUrl[imgKey] = reader.result;
    };

  }
}
