import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Inventaire } from '../../shared/model/inventaire.interface';
import { InventaireSerializer } from '../../shared/serializer/inventaire.serializer';
import { InventaireService } from '../../shared/service/inventaire.service';

@Component({
  selector: 'app-print-inventaires',
  templateUrl: './print-inventaires.component.html',
  styleUrls: ['./print-inventaires.component.scss']
})
export class PrintInventairesComponent {
  inventaires: Inventaire[] = []
  constructor(public appService: AppService, public inventaireService: InventaireService) {
    this.inventaires = this.inventaireService.getInventairesToPrint();
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
