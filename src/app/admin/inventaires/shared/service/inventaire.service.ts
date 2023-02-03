import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../../environments/environment';
import {Observable} from "rxjs";
import {Coordinate, Epaysage, Inventaire} from "../model/inventaire.interface";
import {Nuisible} from '../../../config-inventaire/shared/model/nuisible.interface';
import {Essence} from '../model/essence.interface';
import * as inventoryConst from "../constant/inventaire.constants";

import {IOption} from "ng-select";
import * as moment from 'moment';
import {UserModele} from "../../../gestion-droits/shared/model/user";
import {Champignons} from "../../../config-inventaire/shared/model/Champignons";
import {InventaireStat} from "../model/inventaire-stat";
import {MapService} from "../../../../shared/service/map.service";
import {ResourceService} from "../../../../shared/service/resource.service";
import {InventaireSerializer} from "../serializer/inventaire.serializer";
import {InventoryConstService} from "./inventory-const.service";
import {map} from "rxjs/operators";
import {InventoryMapInterface} from "../model/InventoryMap.interface";
import * as inventoryConstWood from "../constant/woodArea.constant";

@Injectable()

export class InventaireService extends ResourceService<Inventaire> {

  constructor(private http: HttpClient, private inventaireSerializer: InventaireSerializer) {
    super(
      http,
      'inventaire',
      inventaireSerializer
    )
  }

  // urgent fonction modification
  getOneInventaire(id: number): Observable<Inventaire> {
    return this.http.get<Inventaire>(`${environment.baseUrl}${this.endpoint}/${id}`, {headers: environment.headers});
  }

  duplicateInvCreate(payload: any) {
    let data = this.inventaireSerializer.toJson(payload)
    const typeInv = !InventaireService.isEB(data.type) ? 'arbre' : 'epaysage';
    return this.http.post(`${environment.baseUrl}${typeInv}`, data, {headers: environment.headers});
  }

  duplicateInvUpdate(payload: any, id: number): Observable<any> {
    let data = this.invFactoryDuplicatePut(payload, id)
    if (data !== null) {
      const typeInv = (!InventaireService.isEB(data.type)) ? 'arbre' : 'epaysage';
      return this.http.put(`${environment.baseUrl}${this.endpoint}/${data.id}/${typeInv}`, data, {headers: environment.headers})
        .pipe(
          map((result: any) => this.inventaireSerializer.fromJson(result.data)));
    }
  }

  updateInventory(payload: any) {
    if (payload !== null) {
      const typeInv = (!InventaireService.isEB(payload.type)) ? 'arbre' : 'epaysage';
      return this.http.put(`${environment.baseUrl}inventaire/${payload.id}/${typeInv}`, payload, {headers: environment.headers});
    }
  }

  // VALID MANY INVENTAIRE
  validInventaireIsFinished(idInventaires: number[]) {
    return this.http.post(`${environment.baseUrl}${this.endpoint}/isFinished`, {ids: idInventaires}, {headers: environment.headers})
  }

  // DELETE MANY INVENTARE
  deleteInventaire(inventaireIds: number[]) {
    return this.http.post(`${environment.baseUrl}inventaire/deleteMany`, {ids: inventaireIds}, {headers: environment.headers})
  }

  // ARRAY TRAITEMENT AUTOCOMPLETE ESSENCE
  distinctElmentOnArray(data: String[]) {
    let result = [];
    const map = new Map();
    for (const item of data) {
      if (!map.has(item)) {
        map.set(item, true);    // set any value to Map
        result.push(item);
      }
    }
    return result;
  }

  arrayOnAutoComplete(data: Inventaire[]) {
    const arrayEspece = [];
    data.map(obj => {
      if (obj.arbre) {
        arrayEspece.push(obj.arbre.espece.name);
      } else if (obj.epaysage) {
        obj.epaysage.essence.map(essence => {
          if (essence.espece.name)
            arrayEspece.push(essence.espece.name)
        });
      }
    });
    return this.distinctElmentOnArray(arrayEspece);
  }

  // TRANSFORM DATA WHEN FETCH ON NG-SELECT
  factoryDataModelOptions(data: any[], selectedOptions: string[]) {
    data.map(elt =>
      selectedOptions = [
        ...selectedOptions, elt.id.toString()
      ]);
    return selectedOptions;
  }

  factorySelectArray(data: any, selectedOptions: IOption[]) {

    data.map(elt =>
      selectedOptions = [
        ...selectedOptions, {
          label: elt.displayName,
          value: elt.name
        }
      ]);
    return selectedOptions;
  }

  transformRisqueRupture(risque: any[]) {
    const tab = [];
    if (risque.length === 0) return [];

    risque.map(elt => {
      if (elt.collet) {
        tab.push(elt.collet)
      } else if (elt.tronc) {
        tab.push(elt.tronc)
      } else {
        tab.push(elt.houppier)
      }
    });
    return tab;
  }

  arrayDistinctGenreAdded(data: Inventaire[]) {
    const arrayEspece = [];
    data.map(obj => {
      if (obj.arbre) {
        arrayEspece.push(obj.arbre.espece.genre);
      } else if (obj.epaysage) {
        obj.epaysage.essence.map(essence => {
          if (essence.espece.genre)
            arrayEspece.push(essence.espece.genre)
        });
      }
    });
    return this.distinctElmentOnArray(arrayEspece);
  }

  private createEssenceArray(essences: Essence [], epaysage: Epaysage): Essence[] {
    let tab = [];

    for (let i = 0; i < essences.length; i++) {
      tab.push({
        "diametre": essences[i].diametre,
        "hauteur": essences[i].hauteur,
        "numSujet": essences[i].numSujet,
        "codeSite": essences[i].codeSite,
        "countSubject": essences[i].countSubject,
        "epaysage": epaysage.id,
        "caract": essences[i].caract,
        "caractOther": essences[i].caractOther,
        "stadeDev": essences[i].stadeDev,
        "houppier": essences[i].houppier,
        "critere": essences[i].critere,
        "critereCom": essences[i].critereOther,
        "etatGeneral": essences[i].etatGeneral,
        "etatSanGeneralChampignons": essences[i].etatSanGeneralChampignons.filter((res: Champignons) => {
          return res.id;
        }).map(val => val.id),
        "etatSanGeneralParasite": essences[i].etatSanGeneralParasite.filter((res: Nuisible) => res.id).map(data => data.id),
        "etatSanGeneralOther": essences[i].etatSanGeneralOther,
        "risque": essences[i].risque,
        "domaine": essences[i].domaine,
        "nuisance": essences[i].nuisance,
        "proximite": essences[i].proximite,
        "proximiteOther": essences[i].proximiteOther,
        "tauxFreq": essences[i].tauxFreq,
        "typePassage": essences[i].typePassage,
        "typePassageOther": essences[i].typePassageOther,
        "accessibilite": essences[i].accessibilite,
        "accessibiliteOther": essences[i].accessibiliteOther,
        "nbreSujetConcerne": essences[i].nbreSujetConcerne,
        "travaux": essences[i].travaux ? essences[i].travaux : [],
        "travauxSoin": essences[i].travauxSoin,
        "travauxProtection": essences[i].travauxProtection,
        "travauxOther": essences[i].travauxOther,
        "dateTravaux": essences[i].dateTravaux,
        "userEditedDateTravaux": essences[i].userEditedDateTravaux,
        "travauxCom": essences[i].travauxCom,
        "travauxTypeIntervention": essences[i].travauxTypeIntervention,
        "varietyGrade": essences[i].varietyGrade,
        "healthIndex": essences[i].healthIndex,
        "healthColumn": essences[i].healthColumn,
        "aestheticIndex": essences[i].aestheticIndex,
        "aestheticColumn": essences[i].aestheticColumn,
        "locationIndex": essences[i].locationIndex,
        "espece": essences[i].espece.id,
        "proximiteWithDict": essences[i].proximiteWithDict ? essences[i].proximiteWithDict : [],
        "imageUrl": {
          "img1": essences[i].imageUrl.img1,
          "img2": essences[i].imageUrl.img2,
          "img3": essences[i].imageUrl.img3
        }
      })
    }
    return tab
  }

  public invFactoryDuplicatePost(inventaire: Inventaire) {
    if (inventaire.arbre) {
      return {
        "diametre": inventaire.arbre.diametre,
        "hauteur": inventaire.arbre.hauteur,
        "type": inventaire.type,
        "isFinished": inventaire.isFinished,
        "coord": {
          "lat": inventaire.arbre.coord.lat,
          "long": inventaire.arbre.coord.long,
        },
        "espece": inventaire.arbre.espece.id,
        "numSujet": inventaire.arbre.numSujet,
        "codeSite": inventaire.arbre.codeSite,
        "risque": inventaire.arbre.risque,
        "imgUrl": {
          "img1": inventaire.arbre.imgUrl.img1,
          "img2": inventaire.arbre.imgUrl.img2,
          "img3": inventaire.arbre.imgUrl.img3
        }
      };
    } else {
      // ESSENCE
      return {
        "coord": MapService.createArrayInverse(inventaire.epaysage.coord),
        "type": inventaire.type,
        "isFinished": inventaire.isFinished,
        "essence": []
      }
    }

  }

  public invFactoryDuplicatePut(inventaire: Inventaire, id) {
    if (inventaire.arbre) {
      inventaire.arbre = InventoryConstService.factoryArbreAttributeInverse(inventaire.arbre);
      return {
        "id": id,
        "diametre": inventaire.arbre.diametre,
        "hauteur": inventaire.arbre.hauteur,
        "type": inventaire.type,
        "isFinished": inventaire.isFinished,
        "coord": {
          "lat": inventaire.arbre.coord.lat,
          "long": inventaire.arbre.coord.long,
        },
        "espece": inventaire.arbre.espece.id,
        "numSujet": inventaire.arbre.numSujet,
        "codeSite": inventaire.arbre.codeSite,
        "caractPied": inventaire.arbre.caractPied,
        "caractPiedOther": inventaire.arbre.caractPiedOther,
        "caractTronc": inventaire.arbre.caractTronc,
        "caractTroncMultiples": inventaire.arbre.caractTroncMultiples,
        "etatSanCollet": inventaire.arbre.etatSanCollet,
        "etatSanColletCavite": inventaire.arbre.etatSanColletCavite,
        "etatSanColletChampignons": inventaire.arbre.etatSanColletChampignons.filter((data: Champignons) => data.id).map(data => data.id),
        "etatSanColletChampignonsAutres": inventaire.arbre.etatSanColletChampignonsAutres,
        "etatSanTronc": inventaire.arbre.etatSanTronc,
        "etatSanTroncCavite": inventaire.arbre.etatSanTroncCavite,
        "etatSanGeneral": inventaire.arbre.etatSanGeneral,
        "etatSanTroncCorpsEtranger": inventaire.arbre.etatSanTroncCorpsEtranger,
        "etatSanTroncChampignons": inventaire.arbre.etatSanTroncChampignons.filter((data: Champignons) => data.id).map(data => data.id),
        "etatSanTroncChampignonsAutres": inventaire.arbre.etatSanTroncChampignonsAutres,
        "etatSanTroncNuisibles": inventaire.arbre.etatSanTroncNuisibles.filter((data: Nuisible) => data.id).map(data => data.id),
        "etatSanHouppier": inventaire.arbre.etatSanHouppier,
        "etatSanHouppierChampignons": inventaire.arbre.etatSanHouppierChampignons.filter((data: Champignons) => data.id).map(data => data.id),
        "etatSanHouppierChampignonsAutres": inventaire.arbre.etatSanHouppierChampignonsAutres,
        "etatSanHouppierNuisibles": inventaire.arbre.etatSanHouppierNuisibles.filter((data: Nuisible) => data.id).map(data => data.id),
        "risque": inventaire.arbre.risque,
        "risqueGeneral": inventaire.arbre.risqueGeneral,
        "critere": inventaire.arbre.critere,
        "implantation": inventaire.arbre.implantation,
        "domaine": inventaire.arbre.domaine,
        "nuisance": inventaire.arbre.nuisance,
        "portArbre": inventaire.arbre.portArbre,
        "stadeDev": inventaire.arbre.stadeDev,
        "nuisanceNuisibles": inventaire.arbre.nuisanceNuisibles.filter((data: Nuisible) => data.id).map(data => data.id),
        "proximite": inventaire.arbre.proximite,
        "proximiteOther": inventaire.arbre.proximiteOther,
        "proximiteWithDict": inventaire.arbre.proximiteWithDict,
        "tauxFreq": inventaire.arbre.tauxFreq,
        "typePassage": inventaire.arbre.typePassage,
        "accessibilite": inventaire.arbre.accessibilite,
        "accessibiliteOther": inventaire.arbre.accessibiliteOther,
        "userEditedDateTravaux": inventaire.arbre.userEditedDateTravaux,
        "varietyGrade": inventaire.arbre.varietyGrade,
        "aestheticIndex": inventaire.arbre.aestheticIndex,
        "locationIndex": inventaire.arbre.locationIndex,
        "healthIndex": inventaire.arbre.healthIndex,
        "aestheticColumn": inventaire.arbre.aestheticColumn,
        "healthColumn": inventaire.arbre.healthColumn,
        "abattage": inventaire.arbre.abattage,
        "travauxColletMultiple": inventaire.arbre.travauxColletMultiple,
        "travauxColletOther": inventaire.arbre.travauxColletOther,
        "travauxTroncOther": inventaire.arbre.travauxTroncOther,
        "travauxTroncMultiple": inventaire.arbre.travauxTroncMultiple,
        "travauxTroncProtection": inventaire.arbre.travauxTroncProtection,
        "travauxHouppierMultiple": inventaire.arbre.travauxHouppierMultiple,
        "travauxHouppierOther": inventaire.arbre.travauxHouppierOther,
        "dateTravaux": inventaire.arbre.dateTravaux,
        "critereOther": inventaire.arbre.critereOther,
        "risqueGeneralOther": inventaire.arbre.risqueGeneralOther,
        "typePassageOther": inventaire.arbre.typePassageOther,
        "dateProVisite": inventaire.arbre.dateProVisite
      };
    } else {
      // EPAYSAGE
      return {
        "id": id,
        "coord": MapService.createArrayInverse(inventaire.epaysage.coord),
        "isFinished": inventaire.isFinished,
        "type": inventaire.type,
        "essence": this.createEssenceArray(inventaire.epaysage.essence, inventaire.epaysage)
      }

    }

  }

  public convertRisqueGnl(value: string) {
    return inventoryConst.RISQUE_TAB.find(elt => elt.name == value) ?
      inventoryConst.RISQUE_TAB.find(elt => elt.name == value).displayName : '';
  }

  static convertRisqueRupture(collet: string, tronc: string, houppier: string): any[] {
    return [{"collet": collet},
      {"tronc": tronc},
      {"houppier": houppier}
    ];
  }

  stockInventaireToPrint(inv: Inventaire): void {
    localStorage.setItem('inventaireToPrint', JSON.stringify(inv))
  }

  stockInventairesToPrint(invs: Inventaire[]): void {
    localStorage.setItem('inventairesToPrint', JSON.stringify(invs))
  }

  stockUserToPrint(user: UserModele): void {
    localStorage.setItem('userInventaireToPrint', JSON.stringify(user))
  }

  getInventaireToPrint(): Inventaire {
    return JSON.parse(localStorage.getItem('inventaireToPrint'));
  }

  getInventairesToPrint(): Inventaire[] {
    return JSON.parse(localStorage.getItem('inventairesToPrint'));
  }

  getUserToPrint(): UserModele {
    return JSON.parse(localStorage.getItem('userInventaireToPrint'));
  }

  destroyInventaireToPrint() {
    localStorage.removeItem('inventaireToPrint');
    localStorage.removeItem('userInventaireToPrint');
  }

  destroyInventairesToPrint() {
    localStorage.removeItem('inventairesToPrint');
  }

  getMostValueEssence() {
    return JSON.parse(localStorage.getItem('mostValueEssence'));
  }

  setMostValueEssence(inv: Inventaire) {
    if (inv.epaysage.essence.length !== 0) {
      const essence = InventaireService.mostValueEssence(inv);
      localStorage.setItem('mostValueEssence', JSON.stringify(essence))
    }
  }

  destroyMostValue() {
    localStorage.removeItem('mostValueEssence')
  }

  public static mostValueEssence(inv: Inventaire): Essence {
    let num = 0,
      pos = 0;
    inv.epaysage.essence.forEach((value, key) => {
      if (value.countSubject > num) {
        pos = key;
        num = value.countSubject;
      }
    });
    return inv.epaysage.essence[pos];
  }

  public static extractFileJson(tabInvSelected) {
    // Nouvelle plantations
    let tab = [];
    tabInvSelected.map(elt => {
      tab.push({
        'Genre': elt.genre,
        'Espece': elt.espece,
        'Cultivar': elt.cultivar,
        'Nombre de sujets': 1,
        'Hauteur': elt.hauteur,
        'Diametre': elt.diametre,
        'Adresse': elt.address,
        'CP': InventaireSerializer.formatCpVille(elt.ville).cp,
        'Ville': InventaireSerializer.formatCpVille(elt.ville).ville,
        'Code site': elt.codeSite,
        'Identification': elt.numSujet,
        'Date inventaire initial': elt.createdAt ? moment(elt.createdAt).format('DD-MM-YYYY') : '',
        'Dernière intervention': elt.statusTravaux ? elt.userEditedDateTravaux ? moment(elt.userEditedDateTravaux).format('DD-MM-YYYY') : moment(elt.createdAt).format('DD-MM-YYYY') : moment(elt.createdAt).format('DD-MM-YYYY'),
        'lat': (elt.type.toUpperCase() === 'ARBRE' || 'ALIGNEMENT') ? elt.coord.lat : InventaireService.concatCoordEpaysage(elt.coord).lat,
        'long': (elt.type.toUpperCase() === 'ARBRE' || 'ALIGNEMENT') ? elt.coord.long : InventaireService.concatCoordEpaysage(elt.coord).long
      });
    });

    return tab;
  }

  static concatCoordEpaysage(coord: Coordinate[]) {
    return {lat: coord.map(elt => elt.lat).toString(), long: coord.map(elt => elt.long).toString()}
  }

  public static extractFileTravauxJson(tabInvSelected) {
    // Travaux
    let tab = [];

    tabInvSelected.map(elt => {

      let travauxAll = "";

      if (!InventaireService.isEB(elt.type)) {
        if (!elt.abattage) {
          // add travaux tronc si pas d'abbatage
          if (elt.travauxTroncMultiple.length > 0 && !elt.travauxTroncMultiple.includes('Aucun travaux')) {
            elt.travauxTroncMultiple.forEach(function (element) {
              if (element != "") {
                travauxAll += element + ' / ';
              }

            });
          }

          if (elt.travauxTroncOther) {
            travauxAll += elt.travauxTroncOther + ' / ';
          }

          // add travaux houppier si pas d'abbatage
          if (elt.travauxHouppierMultiple.length > 0 && !elt.travauxHouppierMultiple.includes('Aucun travaux')) {
            elt.travauxHouppierMultiple.forEach(function (element) {
              if (element != "") {
                travauxAll += element + ' / ';
              }
            });
          }

          if (elt.travauxHouppierOther) {
            travauxAll += elt.travauxHouppierOther + ' / ';
          }

          // add travaux collet si pas d'abbatage
          if (elt.travauxColletMultiple.length > 0 && !elt.travauxColletMultiple.includes('Aucun travaux')) {
            elt.travauxColletMultiple.forEach(function (element) {
              if (element != "") {
                travauxAll += element + ' / ';
              }
            });
          }

          if (elt.travauxColletOther) {
            travauxAll += elt.travauxColletOther + ' / ';
          }

        } else {

          // add abattage info
          travauxAll += elt.abattage;
        }

      } else {
        elt.travaux.forEach(function (element) {
          travauxAll += element + ' / ';
        });
      }

      // Delete last "/" in the string
      if (travauxAll.match(/\/\s$/)) {
        travauxAll = travauxAll.substr(0, travauxAll.length - 2);
      }

      tab.push({
        'Genre': elt.genre,
        'Espece': elt.espece,
        'Cultivar': elt.cultivar,
        'Travaux à réaliser': travauxAll,
        'Date échéance': elt.userEditedDateTravaux ? moment(elt.userEditedDateTravaux).format('DD-MM-YYYY') : '',
        'Nombre de sujets': elt.countSubject,
        'Hauteur': elt.hauteur,
        'Diametre': elt.diametre,
        'Adresse': elt.address,
        'CP': InventaireSerializer.formatCpVille(elt.ville).cp,
        'Ville': InventaireSerializer.formatCpVille(elt.ville).ville,
        'Code site': elt.codeSite,
        'Identification': elt.numSujet,
        'Valeur Beva': elt.beva,
        'Commentaires': '',
        'Recenseur': elt.username
      });
    });
    return tab;
  }

  public static arrayTravauxListJson(inventaires: Inventaire[]) {
    const tab = [];
    inventaires.map((elt: Inventaire) => {
      if (elt.arbre) {
        tab.push({
          selected: false,
          id: elt.id,
          type: InventaireSerializer.setType(elt),
          genre: elt.arbre.espece.genre,
          espece: elt.arbre.espece.name,
          cultivar: elt.arbre.espece.cultivar,
          workToRealize: '',
          idEssence: null,
          userEditedDateTravaux: elt.arbre.userEditedDateTravaux,
          countSubject: 1,
          hauteur: elt.arbre.hauteur,
          diametre: elt.arbre.diametre,
          address: elt.arbre.address,
          ville: elt.arbre.ville,
          codeSite: elt.arbre.codeSite,
          numSujet: elt.arbre.numSujet,
          beva: elt.arbre.beva,
          recenseur: elt.user.username,
          username: elt.user.username,
          abattage: inventoryConst.ABATTAGE_TAB.find(obj => obj.name == elt.arbre.abattage) ? inventoryConst.ABATTAGE_TAB.find(obj => obj.name == elt.arbre.abattage).displayName : '',
          travauxColletMultiple: InventoryConstService.factoryArray(elt.arbre.travauxColletMultiple !== null ? elt.arbre.travauxColletMultiple.filter(data => data != 'other') : [], inventoryConst.TRAVAUX_COLLET_TAB),
          travauxColletOther: elt.arbre.travauxColletOther,
          travauxTroncMultiple: InventoryConstService.factoryArray(elt.arbre.travauxTroncMultiple !== null ? elt.arbre.travauxTroncMultiple.filter(data => data != 'other' && data != 'protection') : [], inventoryConst.TRAVAUX_TRONC_TAB),
          travauxTroncOther: elt.arbre.travauxTroncOther,
          travauxTroncProtection: elt.arbre.travauxTroncProtection,
          travauxHouppierMultiple: InventoryConstService.factoryArray(elt.arbre.travauxTroncMultiple !== null ? elt.arbre.travauxTroncMultiple.filter(data => data != 'other' && data != 'protection') : [], inventoryConst.TRAVAUX_TRONC_TAB),
          travauxHouppierOther: elt.arbre.travauxHouppierOther,
          dateProVisite: elt.arbre.dateProVisite,
          dateTravaux: elt.arbre.dateTravaux,
          statusTravaux: elt.arbre.statusTravaux,
          risqueGeneralOther: elt.arbre.risqueGeneralOther,
          etatSanGeneral: InventoryConstService.factoryArray(elt.arbre.etatSanGeneral, inventoryConst.ETAT_SAN_GENERAL_TAB)
        })
      } else {
        elt.epaysage.essence.map((data: Essence) => {
          moment(data.userEditedDateTravaux).isValid() && tab.push({
            selected: false,
            id: elt.id,
            type: InventaireSerializer.setType(elt),
            genre: data.espece.genre,
            espece: data.espece.name,
            cultivar: data.espece.cultivar,
            workToRealize: '',
            userEditedDateTravaux: data.userEditedDateTravaux,
            countSubject: data.countSubject,
            idEssence: data.id,
            hauteur: data.hauteur,
            diametre: data.diametre,
            address: elt.epaysage.address,
            ville: elt.epaysage.ville,
            codeSite: data.codeSite,
            numSujet: data.numSujet,
            beva: data.beva,
            dateTravaux: data.dateTravaux,
            dateProVisite: data.dateProVisite,
            travauxOther: data.travauxOther,
            travauxSoin: data.travauxSoin,
            travauxProtection: data.travauxProtection,
            etatSanGeneralOther: data.etatSanGeneralOther,
            username: elt.user.username,
            travaux: InventoryConstService.factoryArray(data.travaux.length !== 0 ? data.travaux.filter(data => (data !== 'other' && data !== 'soin-particulier-precisez' && data !== 'protection-particuliere-precisez')) : [], inventoryConstWood.TRAVAUX_TAB),
            statusTravaux: data.statusTravaux,
            travauxCom: data.travauxCom,
            etatGeneral: InventoryConstService.factoryArray(data.etatGeneral.length !== 0 ? data.etatGeneral.filter(data => (data !== 'comment' && data !== 'champignons-lignivores' && data !== 'parasite' && data !== 'parasite-other')) : [], inventoryConstWood.ETAT_GENERAL_TAB)
          })
        })
      }
    });
    return tab;
  }

  uploadImageArbre(selectedFiles, id, position = null) {
    let fd = new FormData();
    let i = 0;
    if (position) {
      fd.append('img' + position, selectedFiles[0]._file, selectedFiles[0]._file.name)
    } else {
      selectedFiles.forEach(element => {
        i++;
        const selectedFile = element._file;
        fd.append('img' + i, selectedFile, selectedFile.name)
      });
    }
    return this.http.post(`${environment.baseUrl}arbre/${id}/upload`, fd)
  }

  deleteImgArbre(position, id) {
    return this.http.put(`${environment.baseUrl}arbre/${id}/deleteImg`, {
      numImg: position
    }, {headers: environment.headers})
  }

  getInventaireByEpaysage(id) {
    return this.http.get(`${environment.baseUrl}epaysage/${id}`, {headers: environment.headers})
  }

  getAddessVille(lat, long, id) {
    return this.http.post(`${environment.baseUrl}arbre/${id}/addressVille`, {
        lat: lat,
        long: long
      }
      , {headers: environment.headers})
  }

  updateCoordTree(lat, long, address, ville, id) {
    return this.http.patch(`${environment.baseUrl}arbre/${id}/changeCoord`, {
      lat: lat,
      long: long,
      id: id,
      address: address,
      ville: ville
    }, {headers: environment.headers})
  }

  rotateImg(position, id, rotation, type: string = 'arbre') {
    // rotate Image oyu Essence
    return this.http.post(`${environment.baseUrl}${type}/${id}/rotate`, {
      position: position,
      degre: rotation
    }, {headers: environment.headers})
  }

  getInventairesStat(): Observable<InventaireStat> {
    return this.http.get<InventaireStat>(`${environment.baseUrl}inventaire/stat`, {headers: environment.headers})
  }

  // Date init travaux default
  static setDateInitTravaux(inv: any[]): any[] {
    inv.forEach((elt) => {
      if (!elt.statusTravaux && !elt.updatedAt) elt.updatedAt = elt.createdAt;
    });
    return inv;
  }

  getInventoryByPosition(lat: number, lng: number, data, position: string): Observable<InventoryMapInterface[]> {
    return this.http.post(`${environment.baseUrl}${this.endpoint}/position`,
      {
        position: position,
        lat: lat,
        lng: lng,
        critere: data.arbreRemarquable,
        codeSite: data.codeSite,
        isFinished: data.isFinished,
        espece: data.espece
      }, {headers: environment.headers})
      .pipe(
        map((result: Inventaire[]) => InventaireSerializer.arrayMapJsonInventory(result)
        )
      )
  }

  getInventaireFinished(): Observable<Inventaire[]> {
    return this.http.post<Inventaire[]>(`${environment.baseUrl}${this.endpoint}/finished`, {headers: environment.headers})
  }

  getInventaireNotFinished(): Observable<Inventaire[]> {
    return this.http.post<Inventaire[]>(`${environment.baseUrl}${this.endpoint}/notfinished`, {headers: environment.headers})
  }

  static concatOtherInventory(inventory: Inventaire): Inventaire {
    if (inventory.arbre) {
      // Sanitaire
      inventory.arbre.etatSanColletOther && inventory.arbre.etatSanCollet.push(inventory.arbre.etatSanColletOther);
      inventory.arbre.etatSanTroncOther && inventory.arbre.etatSanTronc.push(inventory.arbre.etatSanTroncOther);
      inventory.arbre.etatSanHouppierOther && inventory.arbre.etatSanHouppier.push(inventory.arbre.etatSanHouppierOther);

      // Travaux
      inventory.arbre.travauxColletOther && inventory.arbre.travauxColletMultiple.push(inventory.arbre.travauxColletOther.toString());
      inventory.arbre.travauxTroncOther && inventory.arbre.travauxTroncMultiple.push(inventory.arbre.travauxTroncOther.toString());
      inventory.arbre.travauxHouppierOther && inventory.arbre.travauxHouppierMultiple.push(inventory.arbre.travauxHouppierOther.toString());
      //
      inventory.arbre.proximiteOther && inventory.arbre.proximite.push(inventory.arbre.proximiteOther);
      inventory.arbre.typePassage && inventory.arbre.typePassage.push(inventory.arbre.typePassageOther);

      // caract
      inventory.arbre.caractPiedOther && inventory.arbre.caractPied.push(inventory.arbre.caractPiedOther);

      inventory.arbre.critereOther && inventory.arbre.critere.push(inventory.arbre.critereOther);
    } else {
      inventory.epaysage.essence.filter((elt: Essence) => {
        // Other params
        elt.etatSanGeneralOther && elt.etatGeneral.push(elt.etatSanGeneralOther);
        elt.critereOther && elt.critere.push(elt.critereOther);
        elt.proximite && elt.proximite.push(elt.proximiteOther);
        elt.travaux && elt.travaux.push(elt.travauxOther);
        elt.typePassage && elt.typePassage.push(elt.typePassageOther);
      })
    }
    return inventory;
  }
  static checkOtherInventory(inventory: Inventaire): Inventaire {
    if (inventory.arbre) {
      // Sanitaire
      if (inventory.arbre.etatSanCollet.findIndex(elm => elm === "other") === -1) inventory.arbre.etatSanColletOther = null;
      if (inventory.arbre.etatSanTronc.findIndex(elm => elm === "other") === -1) inventory.arbre.etatSanTroncOther = null;
      if (inventory.arbre.etatSanHouppier.findIndex(elm => elm === "other") === -1) inventory.arbre.etatSanHouppierOther = null;

      // Travaux
      if (inventory.arbre.travauxColletMultiple.findIndex(elm => elm === "other") === -1) inventory.arbre.travauxColletOther = null;
      if (inventory.arbre.travauxTroncMultiple.findIndex(elm => elm === "other") === -1) inventory.arbre.travauxTroncOther = null;
      if (inventory.arbre.travauxHouppierMultiple.findIndex(elm => elm === "other") === -1) inventory.arbre.travauxHouppierOther = null;
      //
      if (inventory.arbre.proximite.findIndex(elm => elm === "other") === -1) inventory.arbre.proximiteOther = null;
      if (inventory.arbre.typePassage.findIndex(elm => elm === "other") === -1) inventory.arbre.typePassageOther = null;

      // caract
      if (inventory.arbre.caractPied.findIndex(elm => elm === "other") === -1) inventory.arbre.caractPiedOther = null;

      if (inventory.arbre.critere.findIndex(elm => elm === "other") === -1) inventory.arbre.critereOther = null;
    } else {
      inventory.epaysage.essence.filter((elt: Essence) => {
        // Other params
        if (elt.etatGeneral.findIndex(elm => elm === "other") === -1) elt.etatSanGeneralOther = null;
        if (elt.critere.findIndex(elm => elm === "other") === -1) elt.critereOther = null;
        if (elt.proximite.findIndex(elm => elm === "other") === -1) elt.proximite = null;
        if (elt.travaux.findIndex(elm => elm === "other") === -1) elt.travauxOther = null;
        if (elt.typePassage.findIndex(elm => elm === "other") === -1) elt.typePassage = null;
      })
    }
    return inventory;
  }

  public static isEB(type: string): boolean {
    return (type.toUpperCase() !== 'ARBRE') && (type.toUpperCase() !== 'ALIGNEMENT');
  }
}
