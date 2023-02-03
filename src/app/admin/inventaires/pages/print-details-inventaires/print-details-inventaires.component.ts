import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Inventaire } from '../../shared/model/inventaire.interface';
import { InventaireSerializer } from '../../shared/serializer/inventaire.serializer';
import { InventaireService } from '../../shared/service/inventaire.service';

@Component({
  selector: 'app-print-details-inventaires',
  templateUrl: './print-details-inventaires.component.html',
  styles: [`
  @page {
    size: auto !important;  /* auto is the initial value */
    margin: 0mm !important; /* this affects the margin in the printer settings */
  }

  @media print {
    a[href]:after {
      content: none !important;
    }
    .pagebreak { page-break-before: always; }
  }

  html {
    margin: -0.5cm 1.6mm 0.2cm 1.6mm !important;
    background: #fff !important;
  }

  body {
    background: #fff !important;
  }

  body > :not(app-root) {
    display: none !important;
  }

  app-layout-sidenav {
    display: none !important;
  }

  app-layout-footer {
    display: none !important;
  }

  app-layout-navbar {
    display: none !important;
  }

  .invoice-print {
    min-width: 100% !important;
    font-size: 15px !important;
  }

  .invoice-print * {
    border-color: #aaa !important;
    color: #000 !important;
  }

  .invoice-print .btn-print {
    display: none !important;
  }

  .invoice-print .title-fiche {
    background-color: #02BC77 !important;
    color: white !important;
  }

  .invoice-print .title-fiche-gray {
    background-color: gray !important;
    color: white !important;
  }

  .invoice-print .bordure_black_gauche {
    padding-left: 12px !important;
    border-left: 1px solid black !important;
    min-height: 6rem !important;
  }

  .invoice-print .risque-color-black {
    background-color: #000 !important;
  }

  .invoice-print .risque-color-green {
    background-color: #77a701 !important;
  }

  .invoice-print .risque-color-yellow {
    background-color: #ffef3c !important;
  }

  .invoice-print .risque-color-red {
    background-color: #EC1936 !important;
  }

  .invoice-print .risque-color-black {
    background-color: #0a0b0d !important;
  }

  .invoice-print .first-bloc {
    min-height: 26rem !important;
  }

  .img-san {
    width: 13rem !important;
    height: 7rem !important;
  }

  .img-san-tronc {
    width: 13rem !important;
    height: 5rem !important;
  }

  .img-san-racine {
    width: 13rem !important;
    height: 3rem !important;
  }

  body .detail-arbre {
    display: none !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    printer-colors: exact !important;
    color-adjust: exact !important;
  }
`
],
encapsulation: ViewEncapsulation.None
})
export class PrintDetailsInventairesComponent implements AfterViewInit {
  inventaires: Inventaire[] = []
  constructor(public appService: AppService, public inventaireService: InventaireService) {
    this.inventaires = this.inventaireService.getInventairesToPrint();
  }
  ngAfterViewInit() {
    window.print();
  }

  getEssence(inv: Inventaire) {
    if (inv.epaysage.essence.length !== 0) {
      return InventaireService.mostValueEssence(inv);
    }
  }

  containsExam(inv: Inventaire){
    return 'Examen complémentaire requis' === inv.arbre.etatSanGeneral.find(data => data == 'Examen complémentaire requis')
  }

  getStatusIsVisite(typeInventory: string, inventaireSubject: any): boolean {
    if (InventaireSerializer.isEB(typeInventory)) {
      return this.checkArrayWithoutWorks(inventaireSubject.travaux) && inventaireSubject.etatGeneral.includes('Examen complémentaire requis')
    } else {
      return this.checkArrayWithoutWorks(inventaireSubject.travauxColletMultiple)
        && this.checkArrayWithoutWorks(inventaireSubject.travauxTroncMultiple) && this.checkArrayWithoutWorks(inventaireSubject.travauxHouppierMultiple)
        && inventaireSubject.etatSanGeneral.includes('Examen complémentaire requis') && !inventaireSubject.abattage;
    }
  }

  getStatusIsTravaux(typeInventaire, inventaireSubject) {
    if (typeInventaire != 'arbre') {
      if (this.checkArrayWithoutWorks(inventaireSubject.travaux) && inventaireSubject.etatGeneral.includes('Examen complémentaire requis')) {
        return false;
      } else {
        return true
      }
    } else {
      if (this.checkArrayWithoutWorks(inventaireSubject.travauxColletMultiple) && this.checkArrayWithoutWorks(inventaireSubject.travauxTroncMultiple) && this.checkArrayWithoutWorks(inventaireSubject.travauxHouppierMultiple) && inventaireSubject.etatSanGeneral.includes('Examen complémentaire requis')) {
        return false;
      } else {
        return true
      }
    }
  }

  checkArrayWithoutWorks(travaux) {
    if (travaux.length == 0 || travaux.includes('Aucun travaux')) {
      return true;
    }
  }

  isWoodArea(type: string): boolean {
    return InventaireSerializer.isEB(type);
  }

}
