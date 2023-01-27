import {Injectable} from '@angular/core';
import {Arbre} from "../model/arbre.interface";
import * as inventoryConst from "../constant/inventaire.constants";
import {Champignons} from "../../../config-inventaire/shared/model/Champignons";
import {Nuisible} from "../../../config-inventaire/shared/model/nuisible.interface";
import {Essence} from "../model/essence.interface";
import * as inventoryConstWood from "../constant/woodArea.constant";
import * as bevaConst from "../constant/beva.const";
import {BevaService} from "./beva.service";

@Injectable()
export class InventoryConstService {

  constructor() {
  }

  /**
   * Serialize arbre attribut from server to client side
   * match with constant inventory
   * @param arbre
   */
  public static factoryArbreAttribute(arbre: Arbre) {
    arbre.caractPied = (arbre.caractPied && arbre.caractPied.length !== 0) ? arbre.caractPied.filter(data => data != 'other') : [];

    arbre.caractPied = InventoryConstService.factoryArray(arbre.caractPied, inventoryConst.CARACT_PIED_TAB);
    arbre.portArbre = inventoryConst.PORT_ARBRE_TAB.find(obj => obj.name == arbre.portArbre) ?
      inventoryConst.PORT_ARBRE_TAB.find(obj => obj.name == arbre.portArbre).displayName : '';
    arbre.caractTronc = inventoryConst.CARACT_TRONC_TAB.find(obj => obj.name == arbre.caractTronc && obj.name !== 'tronc-multiples') ?
      inventoryConst.CARACT_TRONC_TAB.find(obj => obj.name == arbre.caractTronc).displayName : '';

    arbre.implantation = inventoryConst.IMPLANTATION_TAB.find(obj => obj.name == arbre.implantation) ?
      inventoryConst.IMPLANTATION_TAB.find(obj => obj.name == arbre.implantation).displayName : '';
    arbre.domaine = inventoryConst.DOMAINE_TAB.find(obj => obj.name == arbre.domaine) ?
      inventoryConst.DOMAINE_TAB.find(obj => obj.name == arbre.domaine).displayName : '';

    arbre.critere = (arbre.critere && arbre.critere.length !== 0) ? arbre.critere.filter(data => data != 'autre-precisez') : [];
    arbre.critere = InventoryConstService.factoryArray(arbre.critere, inventoryConst.CRITERE_TAB);

    arbre.proximite = (arbre.proximite && arbre.proximite.length !== 0) ? arbre.proximite.filter(data => data != 'other') : [];
    arbre.proximite = InventoryConstService.factoryArray(arbre.proximite, inventoryConst.PROXIMITE_TAB);
    arbre.proximiteWithDict = InventoryConstService.factoryArray(arbre.proximiteWithDict, inventoryConst.PROXIMITE_TAB);

    arbre.stadeDev = inventoryConst.STADE_DEV_TAB.find(obj => obj.name == arbre.stadeDev) ?
      inventoryConst.STADE_DEV_TAB.find(obj => obj.name == arbre.stadeDev).displayName :
      '';

    // ETAT_SANITAIRE
    arbre.etatSanCollet = (arbre.etatSanCollet && arbre.etatSanCollet.length !== 0) ? arbre.etatSanCollet.filter(data => (data != 'champignons-lignivores' && data != 'cavit-nombre' && data != 'other')) : [];
    arbre.etatSanCollet = InventoryConstService.factoryArray(arbre.etatSanCollet, inventoryConst.ETAT_SAN_COLLET_TAB);

    arbre.etatSanTronc = (arbre.etatSanTronc && arbre.etatSanTronc.length !== 0) ? arbre.etatSanTronc.filter(data => (data != 'champignons-lignivores' && data != 'cavit-nombre' && data != 'parasite' && data != 'corps-etranger' && data != 'parasite-other' && data != 'other')) : [];

    arbre.etatSanTronc = InventoryConstService.factoryArray(arbre.etatSanTronc, inventoryConst.ETAT_SAN_TRONC_TAB);

    arbre.etatSanHouppier = (arbre.etatSanHouppier && arbre.etatSanHouppier.length !== 0) ? arbre.etatSanHouppier.filter(data => (data != 'champignons-lignivores' && data != 'parasite' && data != 'other')) : [];

    arbre.etatSanHouppier = InventoryConstService.factoryArray(arbre.etatSanHouppier, inventoryConst.ETAT_SAN_HOUPPIER_TAB);

    arbre.etatSanGeneral = (arbre.etatSanGeneral && arbre.etatSanGeneral.length !== 0) ? arbre.etatSanGeneral.filter(data => data != 'other') : [];
    arbre.etatSanGeneral = InventoryConstService.factoryArray(arbre.etatSanGeneral, inventoryConst.ETAT_SAN_GENERAL_TAB);

    // TAUX FREQ
    arbre.tauxFreq = inventoryConst.TAUX_FREQ_TAB.find(obj => obj.name == arbre.tauxFreq) ?
      inventoryConst.TAUX_FREQ_TAB.find(obj => obj.name == arbre.tauxFreq).displayName : '';

    arbre.typePassage = (arbre.typePassage && arbre.typePassage.length !== 0) ? arbre.typePassage.filter(data => data != 'other') : [];
    arbre.typePassage = InventoryConstService.factoryArray(arbre.typePassage, inventoryConst.TYPE_PASSAGE_TAB);

    arbre.accessibilite = inventoryConst.ACCESSIBILITE_TAB.find(obj => obj.name == arbre.accessibilite && obj.name !== 'other') ?
      inventoryConst.ACCESSIBILITE_TAB.find(obj => (obj.name == arbre.accessibilite)).displayName : '';

    // TARVAUX
    arbre.abattage = inventoryConst.ABATTAGE_TAB.find(obj => obj.name == arbre.abattage) ?
      inventoryConst.ABATTAGE_TAB.find(obj => obj.name == arbre.abattage).displayName : '';

    arbre.dateTravaux = inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.name == arbre.dateTravaux) ?
      inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.name == arbre.dateTravaux).displayName : '';
    arbre.dateProVisite = inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.name == arbre.dateProVisite) ?
      inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.name == arbre.dateProVisite).displayName : '';
    arbre.nuisance = InventoryConstService.factoryArray(arbre.nuisance, inventoryConst.NUISANCE_TAB);

    // RISQUE GENERALES
    arbre.risqueGeneral = (arbre.risqueGeneral !== null) ? arbre.risqueGeneral.filter(data => data != 'other') : [];
    arbre.risqueGeneral = InventoryConstService.factoryArray(arbre.risqueGeneral, inventoryConst.RISQUE_GENERAL_TAB);

    arbre.travauxColletMultiple = arbre.travauxColletMultiple !== null ? arbre.travauxColletMultiple.filter(data => data != 'other') : [];

    arbre.travauxColletMultiple = InventoryConstService.factoryArray(arbre.travauxColletMultiple, inventoryConst.TRAVAUX_COLLET_TAB);

    arbre.travauxTroncMultiple = arbre.travauxTroncMultiple !== null ? arbre.travauxTroncMultiple.filter(data => data != 'other' && data != 'protection') : [];
    arbre.travauxTroncMultiple = InventoryConstService.factoryArray(arbre.travauxTroncMultiple, inventoryConst.TRAVAUX_TRONC_TAB);

    arbre.travauxHouppierMultiple = arbre.travauxHouppierMultiple !== null ? arbre.travauxHouppierMultiple.filter(data => data != 'other') : [];
    arbre.travauxHouppierMultiple = InventoryConstService.factoryArray(arbre.travauxHouppierMultiple, inventoryConst.TRAVAUX_HOUPPIER_TAB);

    arbre.aestheticIndex = BevaService.getDisplayNameIndex(arbre.aestheticColumn, bevaConst.AESTHETIC_INDEX_TAB);
    arbre.locationIndex = BevaService.getDisplayNameIndex(arbre.locationIndex, bevaConst.LOCATION_INDEX_TAB);
    arbre.healthIndex = BevaService.getDisplayNameIndex(arbre.healthColumn, bevaConst.HEALTH_INDEX_TAB);

    // Champignons others
    arbre.etatSanTroncChampignons = arbre.etatSanTroncChampignons.filter((data: Champignons) => data.name !== 'Je ne sais pas')
    arbre.etatSanColletChampignons = arbre.etatSanColletChampignons.filter((data: Champignons) => data.name !== 'Je ne sais pas')
    arbre.etatSanHouppierChampignons = arbre.etatSanHouppierChampignons.filter((data: Champignons) => data.name !== 'Je ne sais pas')

    // nuisible
    arbre.etatSanTroncNuisibles = arbre.etatSanTroncNuisibles.filter((data: Nuisible) => data.name !== 'Autre');
    arbre.etatSanHouppierNuisibles = arbre.etatSanHouppierNuisibles.filter((data: Nuisible) => data.name !== 'Autre');
    return arbre;
  }

  /**
   * Serialize Arbre attribute from client to send to the server
   * Match with inventory constant Arbre
   * @param arbre
   * @return Arbre
   */
  static factoryArbreAttributeInverse(arbre: Arbre): Arbre {

    arbre.caractPied = InventoryConstService.factoryArrayInverse(arbre.caractPied, inventoryConst.CARACT_PIED_TAB);
    arbre.portArbre = inventoryConst.PORT_ARBRE_TAB.find(obj => obj.displayName == arbre.portArbre) ?
      inventoryConst.PORT_ARBRE_TAB.find(obj => obj.displayName == arbre.portArbre).name : '';
    arbre.caractTronc = inventoryConst.CARACT_TRONC_TAB.find(obj => obj.displayName == arbre.caractTronc) ?
      inventoryConst.CARACT_TRONC_TAB.find(obj => obj.displayName == arbre.caractTronc).name : '';

    arbre.implantation = inventoryConst.IMPLANTATION_TAB.find(obj => obj.displayName == arbre.implantation) ?
      inventoryConst.IMPLANTATION_TAB.find(obj => obj.displayName == arbre.implantation).name : '';
    arbre.domaine = inventoryConst.DOMAINE_TAB.find(obj => obj.displayName == arbre.domaine) ?
      inventoryConst.DOMAINE_TAB.find(obj => obj.displayName == arbre.domaine).name : '';

    arbre.critere = InventoryConstService.factoryArrayInverse(arbre.critere, inventoryConst.CRITERE_TAB);
    arbre.proximite = InventoryConstService.factoryArrayInverse(arbre.proximite, inventoryConst.PROXIMITE_TAB);
    arbre.proximiteWithDict = InventoryConstService.factoryArrayInverse(arbre.proximiteWithDict, inventoryConst.PROXIMITE_WITH_DICT_TAB);
    arbre.stadeDev = inventoryConst.STADE_DEV_TAB.find(obj => obj.displayName == arbre.stadeDev) ?
      inventoryConst.STADE_DEV_TAB.find(obj => obj.displayName == arbre.stadeDev).name :
      '';
    // ETAT_SANITAIRE

    arbre.etatSanCollet = InventoryConstService.factoryArrayInverse(arbre.etatSanCollet, inventoryConst.ETAT_SAN_COLLET_TAB);
    arbre.etatSanTronc = InventoryConstService.factoryArrayInverse(arbre.etatSanTronc, inventoryConst.ETAT_SAN_TRONC_TAB);
    arbre.etatSanHouppier = InventoryConstService.factoryArrayInverse(arbre.etatSanHouppier, inventoryConst.ETAT_SAN_HOUPPIER_TAB);
    arbre.etatSanGeneral = InventoryConstService.factoryArrayInverse(arbre.etatSanGeneral, inventoryConst.ETAT_SAN_GENERAL_TAB);

    // TAUX FREQ
    arbre.tauxFreq = inventoryConst.TAUX_FREQ_TAB.find(obj => obj.displayName == arbre.tauxFreq) ?
      inventoryConst.TAUX_FREQ_TAB.find(obj => obj.displayName == arbre.tauxFreq).name : '';
    arbre.typePassage = InventoryConstService.factoryArrayInverse(arbre.typePassage, inventoryConst.TYPE_PASSAGE_TAB);

    // ACCESSIBILITE
    arbre.accessibilite = inventoryConst.ACCESSIBILITE_TAB.find(obj => obj.displayName == arbre.accessibilite) ?
      inventoryConst.ACCESSIBILITE_TAB.find(obj => obj.displayName == arbre.accessibilite).name : '';
    // TARVAUX
    arbre.abattage = inventoryConst.ABATTAGE_TAB.find(obj => obj.displayName == arbre.abattage) ?
      inventoryConst.ABATTAGE_TAB.find(obj => obj.displayName == arbre.abattage).name : '';

    arbre.dateTravaux = inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.displayName == arbre.dateTravaux) ?
      inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.displayName == arbre.dateTravaux).name : '';
    arbre.dateProVisite = inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.displayName == arbre.dateProVisite) ?
      inventoryConst.DATE_TRAVAUX_TAB.find(obj => obj.displayName == arbre.dateProVisite).name : '';
    arbre.nuisance = InventoryConstService.factoryArrayInverse(arbre.nuisance, inventoryConst.NUISANCE_TAB);

    // RISQUE GENERALES
    arbre.risqueGeneral = InventoryConstService.factoryArrayInverse(arbre.risqueGeneral, inventoryConst.RISQUE_GENERAL_TAB);

    arbre.aestheticIndex = BevaService.getValueColumn(arbre.aestheticColumn, bevaConst.AESTHETIC_INDEX_VALUE);

    arbre.locationIndex = BevaService.getNameIndex(arbre.locationIndex, bevaConst.LOCATION_INDEX_TAB);
    arbre.healthIndex = BevaService.getValueColumn(arbre.healthColumn, bevaConst.HEALTH_INDEX_VALUE);

    arbre.travauxColletMultiple = InventoryConstService.factoryArrayInverse(arbre.travauxColletMultiple, inventoryConst.TRAVAUX_COLLET_TAB);

    arbre.travauxTroncMultiple = InventoryConstService.factoryArrayInverse(arbre.travauxTroncMultiple, inventoryConst.TRAVAUX_TRONC_TAB);
    arbre.travauxHouppierMultiple = InventoryConstService.factoryArrayInverse(arbre.travauxHouppierMultiple, inventoryConst.TRAVAUX_HOUPPIER_TAB);

    return arbre;
  }

  /**
   * Serialize Essence attribute from server to the client side
   * Match with inventory constant Arbre
   * @param essence
   * @return Essence
   */
  static factoryEssenceAttribute(essence: Essence): any {
    // ACCESSIBILITE
    essence.accessibilite = inventoryConstWood.ACCESSIBILITE_TAB.find(obj => obj.name == essence.accessibilite) ?
      inventoryConstWood.ACCESSIBILITE_TAB.find(obj => obj.name == essence.accessibilite).displayName : '';

    essence.proximite = (essence.proximite && essence.proximite.length !== 0) ? essence.proximite.filter(data => data !== 'other') : [];
    essence.proximite = InventoryConstService.factoryArray(essence.proximite, inventoryConstWood.PROXIMITE_TAB);

    // PROXIMITE
    essence.proximiteWithDict = essence.proximiteWithDict ? InventoryConstService.factoryArray(essence.proximiteWithDict, inventoryConstWood.PROXIMITE_TAB) : [];

    // CRITERE
    essence.critere = (essence.critere && essence.critere.length !== 0) ? essence.critere.filter(data => data !== 'comment') : [];
    essence.critere = InventoryConstService.factoryArray(essence.critere, inventoryConstWood.CRITERE_TAB);

    essence.tauxFreq = inventoryConstWood.TAUX_FREQ_TAB.find(obj => obj.name === essence.tauxFreq) ?
      inventoryConstWood.TAUX_FREQ_TAB.find(obj => obj.name === essence.tauxFreq).displayName : '';
    // TYPE PASSAGE
    essence.typePassage = (essence.typePassage && essence.typePassage.length !== 0) ? essence.typePassage.filter(data => data !== 'other') : [];
    essence.typePassage = InventoryConstService.factoryArray(essence.typePassage, inventoryConstWood.TYPE_PASSAGE_TAB);
    // STADE_DEV
    essence.stadeDev = inventoryConstWood.STADE_DEV_TAB.find(obj => obj.name == essence.stadeDev) ?
      inventoryConstWood.STADE_DEV_TAB.find(obj => obj.name == essence.stadeDev).displayName : '';

    // ETAT GENERAL
    essence.etatGeneral = (essence.etatGeneral && essence.etatGeneral.length !== 0) ? essence.etatGeneral.filter(data => (data !== 'comment' && data !== 'champignons-lignivores' && data !== 'parasite' && data !== 'parasite-other')) : [];
    essence.etatGeneral = InventoryConstService.factoryArray(essence.etatGeneral, inventoryConstWood.ETAT_GENERAL_TAB);

    // HOUPPIER
    essence.houppier = inventoryConstWood.HOUPPIER_TAB.find(obj => obj.name == essence.houppier) ?
      inventoryConstWood.HOUPPIER_TAB.find(obj => obj.name == essence.houppier).displayName : '';

    // DOMAINE
    essence.domaine = inventoryConstWood.DOMAINE_TAB.find(obj => obj.name == essence.domaine) ?
      inventoryConstWood.DOMAINE_TAB.find(obj => obj.name == essence.domaine).displayName : '';

    essence.nuisance = InventoryConstService.factoryArray(essence.nuisance, inventoryConstWood.NUISANCE_TAB);

    // DATE TRAVAUX
    essence.dateTravaux = inventoryConstWood.DATE_TRAVAUX_TAB.find(obj => obj.name == essence.dateTravaux) ?
      inventoryConstWood.DATE_TRAVAUX_TAB.find(obj => obj.name == essence.dateTravaux).displayName : '';

    essence.dateProVisite = inventoryConstWood.DATE_TRAVAUX_TAB.find(obj => obj.name == essence.dateProVisite) ?
      inventoryConstWood.DATE_TRAVAUX_TAB.find(obj => obj.name == essence.dateProVisite).displayName : '';

    // TRAVAUX
    essence.travaux = (essence.travaux && essence.travaux.length !== 0) ? essence.travaux.filter(data => (data !== 'other' && data !== 'soin-particulier-precisez' && data !== 'protection-particuliere-precisez')) : [];
    essence.travaux = InventoryConstService.factoryArray(essence.travaux, inventoryConstWood.TRAVAUX_TAB);
    // RISQUE
    essence.risque = inventoryConstWood.RISQUE_TAB.find(obj => obj.name == essence.risque) ?
      inventoryConstWood.RISQUE_TAB.find(obj => obj.name == essence.risque).displayName : '';

    // CARACT
    essence.caract = inventoryConstWood.CARACT_TAB.find(obj => obj.name == essence.caract && obj.name != 'other') ?
      inventoryConstWood.CARACT_TAB.find(obj => obj.name == essence.caract).displayName : '';

    essence.aestheticIndex = BevaService.getDisplayNameIndex(essence.aestheticColumn, bevaConst.AESTHETIC_INDEX_TAB);
    essence.locationIndex = BevaService.getDisplayNameIndex(essence.locationIndex, bevaConst.LOCATION_INDEX_TAB);
    essence.healthIndex = BevaService.getDisplayNameIndex(essence.healthColumn, bevaConst.HEALTH_INDEX_TAB);

    essence.etatSanGeneralChampignons = essence.etatSanGeneralChampignons.filter((data: Champignons) => data.name !== 'Je ne sais pas');

    return essence;
  }

  /**
   * Factory inventory data id serve the right displayName
   * @param tab
   * @param constTab
   */
  static factoryArray(tab: String[], constTab: any): string[] {
    if (tab.length == 0) return [];
    return tab.map((elt: String) => {
      return constTab.find(obj => elt === obj.name) ? constTab.find(obj => elt === obj.name).displayName : '';
    });
  }

  static factoryArrayInverse(tab: String[], constTab: any) {
    if (tab.length == 0) return [];
    return tab.map((elt: String) => {
      return constTab.find(obj => elt === obj.displayName) ? constTab.find(obj => elt === obj.displayName).name : '';
    });
  }

}
