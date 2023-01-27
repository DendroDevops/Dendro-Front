import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {environment} from "../../../../../environments/environment";
import {AppService} from '../../../../app.service';
import {Inventaire} from '../../shared/model/inventaire.interface';
import {InventaireService} from '../../shared/service/inventaire.service';
import {EssenceService} from "../../shared/service/essence.service";
import {CustomAlertService} from "../../../../customAlertService.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ControlService} from "../../../../shared/service/control.service";
import {AuthService} from '../../../../shared/service/auth.service';
import {MapService} from "../../../../shared/service/map.service";
import {Subject} from "rxjs";
import {BackButtonUrlService} from "../../shared/service/backButtonUrl.service";

@Component({
  selector: 'app-detail-inventaire',
  templateUrl: './detail-inventaire.component.html',
  styleUrls: [
    './detail-inventaire.component.scss',
    '../../../../../vendor/styles/pages/products.scss',
    '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
  ]
})

export class DetailInventaireComponent implements OnInit, OnDestroy {
  visibleSpinner: Boolean = true;
  inventaire: Inventaire;
  originalInventaire: any;

  urlBaseEssence = environment.baseUrl + 'images/epaysage/essences/';

  zoom = 15;
  lat = 46.227638;
  lng = 2.213749000000007;

  fillcolor = '#EC1936';
  eppStroke = '#795548';
  ebcStroke = '#EF6C00';

  iconBrouillon = '../../../assets/static/img/Draft.svg';
  iconTermine = '../../../assets/static/img/Original.svg';
  iconEnAlignement = '../../../assets/static/img/EnAlignement.svg';

  address: String = '';
  ville: String = '';
  latUpdate = null;
  longUpdate = null;

  addressError = false;
  villeError = false;

  unsubscribe$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private inventaireService: InventaireService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private essenceService: EssenceService,
    public appService: AppService,
    private customAlertService: CustomAlertService,
    private modalService: NgbModal,
    private controlService: ControlService,
    public authService: AuthService,
    private urlService: BackButtonUrlService
  ) {
  }

  ngOnInit() {
    this.getOneInventaire();
    this.getRisqueGnlDisplayName('eleve');
  }

  getOneInventaire() {
    // GET ONE INVENTAIRE
    this.visibleSpinner = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.urlService.setId(null);
    this.inventaireService.read(parseInt(id))
      .subscribe((data: Inventaire) => {
          this.originalInventaire = data;
          this.visibleSpinner = false;
          this.inventaire = data;
          if (this.inventaire.epaysage) {
            let essence = data.epaysage.essence;
            if (essence.length > 0) {
              if (essence[0].critereOther) {
                this.inventaire.epaysage.type = 'EB'
              }
              this.inventaire.epaysage.type = essence[0].critere.find((elt: string) => elt === 'espace-boise-classe') ? 'EBC' : 'EP'
            }
            this.inventaire.epaysage.type = 'EB';
            this.inventaire.epaysage.coord = MapService.factoryCoordPolygon(this.inventaire.epaysage.coord);
            this.lat = this.inventaire.epaysage.coord.shift().lat;
            this.lng = this.inventaire.epaysage.coord.shift().lng;
          }
          if (this.inventaire.arbre) {
            this.inventaire.arbre.type = this.inventaire.arbre.implantation === "en-alignement" ? "Alignement" : "Arbre"
            this.address = this.inventaire.arbre.address;
            this.ville = this.inventaire.arbre.ville;
            this.latUpdate = this.inventaire.arbre.coord.lat;
            this.longUpdate = this.inventaire.arbre.coord.long;
          }
        },
        () => {
          this.visibleSpinner = false;
        }
      );
  }

  getAddressVille() {
    this.visibleSpinner = true;
    this.inventaireService.getAddessVille(this.latUpdate, this.longUpdate, this.inventaire.arbre.id)
      .subscribe((res: any) => {
        this.visibleSpinner = false;
        this.address = res.address;
        this.ville = res.ville;
      }, (err: any) => {
        this.visibleSpinner = false;
      })
  }

  isErrorVille() {
    if (this.controlService.isEmpty(this.ville)) {
      this.villeError = true;
      return true;
    }
    this.villeError = false;
    return false;
  }

  isErrorAddress() {
    if (this.controlService.isEmpty(this.address)) {
      this.addressError = true;
      return true;
    }
    this.addressError = false;
    return false;
  }

  onChangeCoord() {
    if (this.isErrorAddress() || this.isErrorVille()) {
      return;
    }
    this.visibleSpinner = true;
    this.inventaireService.updateCoordTree(this.latUpdate, this.longUpdate, this.address, this.ville, this.inventaire.arbre.id)
      .subscribe(() => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Modification effectuée avec succès', 'toast-top-right', 'success');
        this.getOneInventaire();
      }, () => {
        this.visibleSpinner = false;
        this.customAlertService.toastAlert('Impossible de modifier', 'toast-top-right', 'error');
      })
  }

  getCoord(event) {
    this.latUpdate = event.coords.lat;
    this.longUpdate = event.coords.lng;
    this.getAddressVille();
  }

  /**
   * Show details page { essence, tree && printPage}
   * @param id:number
   * @param route:string
   */
  showPage(id: number, route: string): void {
    this.router.navigate([`${route}/${id}`]).then(() => {
    });
  }

  deleteEssence(id: number) {
    this.essenceService.delete(id)
      .subscribe((res: any) => {
        this.getOneInventaire();
      }, () => {
      })
  }

  public getRisqueGnlDisplayName(value: string) {
    return this.inventaireService.convertRisqueGnl(value) ? this.inventaireService.convertRisqueGnl(value) : '';
  }

  addEssence(id: number): void {
    this.router.navigate([`/admin/inventaires/essence/add/${id}`]);
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${DetailInventaireComponent.getDismissReason(reason)}`);
    });
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
