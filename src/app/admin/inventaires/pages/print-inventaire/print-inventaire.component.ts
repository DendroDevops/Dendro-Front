import {Component, OnInit} from '@angular/core';
import {InventaireService} from "../../shared/service/inventaire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Inventaire} from "../../shared/model/inventaire.interface";
import {Essence} from "../../shared/model/essence.interface";
import {AppService} from "../../../../app.service";
import {UserModele} from "../../../gestion-droits/shared/model/user";
import {UserService} from "../../../gestion-droits/shared/service/user.service";
import {MapService} from "../../../../shared/service/map.service";
import {InventaireSerializer} from "../../shared/serializer/inventaire.serializer";

@Component({
  selector: 'app-print-inventaire',
  templateUrl: './print-inventaire.component.html',
  styleUrls: ['./print-inventaire.component.scss']
})
export class PrintInventaireComponent implements OnInit {

  inventaire: Inventaire;
  originalInventaire: Inventaire;
  visibleSpinner = false;
  essence: Essence;
  totalItemEssence = 0;
  totalNbreSujetConcerne = 0;
  vispibleSpinner = false;
  examenResineu = false;
  isTravaux = true;
  user: UserModele;

  constructor(public inventaireService: InventaireService,
              private inventaireSerializer: InventaireSerializer,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public appService: AppService,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getOneInventaire();
  }

  getOneInventaire() {
    this.visibleSpinner = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (isNaN(parseInt(id))) {
      this.visibleSpinner = false;
      return;
    }
    this.inventaireService.getOneInventaire(parseInt(id))
      .subscribe((data: Inventaire) => {
        this.originalInventaire = data;
        this.inventaire = this.inventaireSerializer.fromJson(JSON.parse(JSON.stringify(InventaireService.checkOtherInventory(this.originalInventaire))));
        this.visibleSpinner = false;
        this.inventaireService.destroyInventaireToPrint();
        this.inventaire = InventaireService.concatOtherInventory(this.inventaire);
        if (this.inventaire.arbre) {
          this.inventaire.arbre.risque = this.inventaire.arbre.risque && this.inventaireService.transformRisqueRupture(this.inventaire.arbre.risque);
          this.inventaireService.stockInventaireToPrint(this.inventaire);
          if ('Examen complémentaire requis' === this.inventaire.arbre.etatSanGeneral.find(data => data == 'Examen complémentaire requis')) {
            this.examenResineu = true;
          }
        } else {
          // GET MOST VALUE ESSENCE
          this.inventaireService.destroyMostValue();
          this.inventaire.epaysage.coord = MapService.factoryCoordPolygon(this.inventaire.epaysage.coord);
          this.inventaireService.stockInventaireToPrint(this.inventaire);
          this.essence = InventaireService.mostValueEssence(this.inventaire);
          this.inventaireService.setMostValueEssence(this.inventaire);

          this.totalItemEssence = this.inventaire.epaysage.essence.length;
          this.inventaire.epaysage.essence.forEach((essence: Essence) => {
            this.totalNbreSujetConcerne += essence.nbreSujetConcerne;
          });
        }
        this.userService.read(this.inventaire.user.id)
          .subscribe((res: UserModele) => {
            this.user = res;
            this.inventaireService.stockUserToPrint(this.user)
          }, () => {
          });
        this.vispibleSpinner = false;
      }, () => {
        this.visibleSpinner = false;
        this.router.navigate(['/admin/error-404'])
      })
  }

  getStatusIsVisite(typeInventory: string, inventaireSubject: any): boolean {
    if (InventaireSerializer.isEB(typeInventory)) {
      return this.checkArrayWithoutWorks(inventaireSubject.travaux) || inventaireSubject.etatGeneral.includes('Examen complémentaire requis')
    } else {
      return this.checkArrayWithoutWorks(inventaireSubject.travauxColletMultiple)
        && this.checkArrayWithoutWorks(inventaireSubject.travauxTroncMultiple) && this.checkArrayWithoutWorks(inventaireSubject.travauxHouppierMultiple)
        && inventaireSubject.etatSanGeneral.includes('Examen complémentaire requis') && !inventaireSubject.abattage
    }
  }

  checkArrayWithoutWorks(travaux: string[]): boolean {
    return travaux.length === 0 || (travaux.length === 1 && travaux.includes('Aucun travaux'));
  }

  isWoodArea(type: string) {
    return InventaireSerializer.isEB(type);
  }
}
