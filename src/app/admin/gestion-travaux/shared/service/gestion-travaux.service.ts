import {Injectable} from '@angular/core';
import {InventaireService} from "../../../inventaires/shared/service/inventaire.service";
import {Inventaire} from '../../../inventaires/shared/model/inventaire.interface';
import {Essence} from '../../../inventaires/shared/model/essence.interface';
import * as moment from 'moment';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const STARTDATE = moment(moment().format());
const endDate = moment(moment().add(1, 'month').format());

@Injectable()
export class GestionTravauxService {

  constructor(private inventaireService: InventaireService, private http: HttpClient) {
  }

  validWork(selectedIds: number[]) {
    return this.http.post(`${environment.baseUrl}inventaire/validTravaux`, {ids: selectedIds}, {headers: environment.headers});
  }

  public getInventaireTravaux(): Observable<Inventaire[]> {
    return this.inventaireService
      .getInventaireFinished()
      .pipe(
        map((elt: Inventaire[]) => elt.filter((data: Inventaire) => GestionTravauxService.filterTravauxInv(data) || GestionTravauxService.filterExamenInv(data))
        )
      );
  }

  getInventaireExamens(): Observable<Inventaire[]> {
    return this.inventaireService.getInventaireFinished().pipe(
      map((elt: Inventaire[]) => elt.filter((data: Inventaire) => GestionTravauxService.filterExamenInv(data)))
    );
  }

  getAlertInventaire(): Observable<Inventaire[]> {
    return this.inventaireService.getInventaireFinished().pipe(
      map((elt: Inventaire[]) =>
        elt.filter((data: Inventaire) => this.filterAlertMonth(data) && GestionTravauxService.workStatus(data))
      )
    );
  }

  public static workStatus(inventory: Inventaire): boolean {
    let response
    if (inventory.arbre) {
      return !inventory.arbre.statusTravaux;
    } else {
      inventory.epaysage.essence.forEach((elt) => {
        if (!elt.statusTravaux)
          response = true;
      })
    }
    return response
  }

  /**
   * Find all Examens diag inventory
   * @param inv
   */
  static filterExamenInv(inv): boolean {
    if (inv.arbre) {
      return ((inv.arbre.etatSanGeneral.filter((elt: string) => elt === 'exam-comple').length === 1) || this.isWorkVisiteTree(inv))
        && !inv.arbre.statusTravaux && !inv.arbre.abattage && moment(inv.arbre.userEditedDateTravaux).isValid()
    } else if (inv.epaysage) {
      let tab = [];
      if (GestionTravauxService.filterEssenceArrayExamens(inv.epaysage.essence)) tab.push(inv)
      return tab.length !== 0
    }
  }

  /**
   *
   * @param inv
   */
  static filterTravauxInv(inv: Inventaire) {
    if (inv.arbre) {
      return ((GestionTravauxService.isWorkTree(inv) || inv.arbre.abattage) && !inv.arbre.statusTravaux && moment(inv.arbre.userEditedDateTravaux).isValid());
    } else if (inv.epaysage) {
      let tab = [];
      if (GestionTravauxService.filterEssenceTravaux(inv.epaysage.essence)) tab.push(inv)
      return tab.length !== 0;
    }
  }

  filterAlertMonth(inv): boolean {
    if (inv.arbre) {
      return inv.arbre.userEditedDateTravaux !== null && moment(inv.arbre.userEditedDateTravaux).isBetween(STARTDATE, endDate);
    } else if (inv.epaysage) {
      let tab = [];
      (GestionTravauxService.filterEssenceArrayAlert(inv.epaysage.essence).length !== 0) && tab.push(inv);
      return tab.length !== 0;
    }
  }

  static filterEssenceArrayExamens(data: Essence[]): Essence[] {
    return data.filter((essence: Essence) => (essence.etatGeneral.filter(elt => elt == 'exam-comple').length !== 0 || (GestionTravauxService.isWorkVisite(essence.travaux)))
      && !essence.statusTravaux && moment(essence.userEditedDateTravaux).isValid());
  }

  static filterEssenceTravaux(data: Essence[]): Essence[] {
    return data.filter(essence => (this.isWork(essence.travaux) && !essence.statusTravaux && moment(essence.userEditedDateTravaux).isValid()));
  }

  static filterEssenceArrayAlert(data: Essence[]): Essence[] {
    return data.filter((essence: Essence) => moment(essence.userEditedDateTravaux).isValid() && moment(essence.userEditedDateTravaux).isBetween(STARTDATE, endDate));
  }

  static isWorkTree(inv: Inventaire): boolean {
    return this.isWork(inv.arbre.travauxColletMultiple) ||
      this.isWork(inv.arbre.travauxTroncMultiple) ||
      this.isWork(inv.arbre.travauxHouppierMultiple)
  }

  static isWork(data: any[]): boolean {
    return data.length !== 0 && data.filter((elt: string) => elt !== 'aucun-travaux').length >= 1;
  }

  static isWorkVisite(data: any[]): boolean {
    return data.length === 0 || (data.length === 1 && data.filter(elt => elt === 'aucun-travaux').length === 1);
  }

  static isWorkVisiteTree(inv: any): boolean {
    return this.isWorkVisite(inv.arbre.travauxColletMultiple) &&
      this.isWorkVisite(inv.arbre.travauxTroncMultiple) &&
      this.isWorkVisite(inv.arbre.travauxHouppierMultiple)
  }
}
