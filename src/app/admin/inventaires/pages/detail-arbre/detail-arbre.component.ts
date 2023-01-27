import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {environment} from "../../../../../environments/environment";
import {AppService} from '../../../../app.service';
import {Coordinate, Inventaire} from '../../shared/model/inventaire.interface';
import {InventaireService} from '../../shared/service/inventaire.service';
import {CustomAlertService} from "../../../../customAlertService.service";

import 'hammerjs';
import {moveInUp} from "../../../../router.animations";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from '../../../../shared/service/auth.service';
import {InventaireSerializer} from "../../shared/serializer/inventaire.serializer";

const Masonry = require('masonry-layout/dist/masonry.pkgd.js');

@Component({
  selector: 'app-detail-arbre',
  templateUrl: './detail-arbre.component.html',
  styleUrls: [
    './detail-arbre.component.scss',
    '../../../../../vendor/styles/pages/products.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
    '../../../../../vendor/libs/ngx-image-gallery/ngx-image-gallery.scss'
  ],
  animations: [moveInUp()]
})
export class DetailArbreComponent implements OnInit {
  state: any;
  visibleSpinner: Boolean = true;
  inventaire: Inventaire;
  urlBaseArbre = environment.baseUrl + 'images/arbres/';

  inventairePopUp: Inventaire;
  zoom = 15;
  lat = 46.227638;
  lng = 2.213749000000007;

  fillcolor = '#EC1936';
  eppStroke = '#795548';
  ebcStroke = '#EF6C00';

  images = [];
  detailVisible = true;
  coord: Coordinate = {
    lat: null,
    long: null
  };

  datas: Inventaire[] = [];
  especeDatas: any = [];
  genres: any = [];

  iconBrouillon = '../../../assets/static/img/Draft.svg';
  iconTermine = '../../../assets/static/img/Original.svg';

  current = new Date().getTime();

  constructor(
    private inventaireService: InventaireService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public appService: AppService,
    private customAlertService: CustomAlertService,
    private zone: NgZone,
    private modalService: NgbModal,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.getOneInventaire();
    this.getRisqueGnlDisplayName('eleve');
  }

  getOneInventaire(id: number = null) {
    this.visibleSpinner = true;
    this.inventaireService.read(parseInt(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe((data: Inventaire) => {
          this.visibleSpinner = false;
          this.inventaire = data;
          this.inventaire.arbre.varietyGrade = String(this.inventaire.arbre.varietyGrade).replace(".", ",");
          this.inventaire.arbre.type = this.inventaire.arbre.implantation === "en-alignement" ? "Alignement" : "Arbre";
          this.coord.lat = this.inventaire.arbre.coord.lat;
          this.coord.long = this.inventaire.arbre.coord.long;
        },
        () => {
          this.visibleSpinner = false;
        }
      );
  }

  getCoord(event) {
    this.coord.lat = event.coords.lat;
    this.coord.long = event.coords.lng;
  }

  duplicateInv() {
    this.visibleSpinner = true;

    this.inventaire.arbre.coord.lat = this.coord.lat;
    this.inventaire.arbre.coord.long = this.coord.long;

    this.inventaireService.duplicateInvCreate(this.inventaire)
      .subscribe((data: any) => {
        const id = (!InventaireSerializer.isEB(data.id.type)) ? data.id.id : data.id;
        this.inventaireService.duplicateInvUpdate(this.inventaire, id)
          .subscribe((response: Inventaire) => {
            this.customAlertService.toastAlert('Inventaire dupliqué avec succès', 'toast-top-right', 'success');
            this.detailVisible = true;
            this.inventaire = response;
            this.router.navigate([`/admin/inventaires/arbre/${id}`]);
            this.visibleSpinner = false;
          }, () => {
            this.visibleSpinner = false;
            this.customAlertService.toastAlert("Impossible de dupliquer", 'toast-top-center', 'error');
          })
      }, () => {
        this.visibleSpinner = false;
        this.detailVisible = false;
      })
  }

  changeCoord() {
    this.detailVisible = !this.detailVisible;
  }
  deleteInventory() {
    this.visibleSpinner = true;
    this.inventaireService.delete(this.inventaire.id).subscribe(() => {
      this.customAlertService.toastAlert('Inventaire supprimé avec succès', 'toast-top-right', 'success');
      this.router.navigate([`/admin/inventaires/`]);
      this.visibleSpinner = false;
    }, () => {
      this.visibleSpinner = false;
    })
  }

  public getRisqueGnlDisplayName(value: string) {
    return this.inventaireService.convertRisqueGnl(value) ? this.inventaireService.convertRisqueGnl(value) : '';
  }

  show(id: Number) {
    this.router.navigate([`/admin/inventaires/${id}`]);
  }

  open(content, options = {}, inventaire: Inventaire) {
    this.visibleSpinner = true;
    this.inventairePopUp = inventaire;
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
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
}
