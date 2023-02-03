import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Epaysage, Inventaire} from "../model/inventaire.interface";
import {Essence} from "../model/essence.interface";
import {DataConst, ETAT_SAN_GENERAL_TAB} from "../constant/inventaire.constants";
import {InventoryConstService} from "../service/inventory-const.service";
import {MapService} from "../../../../shared/service/map.service";
import {Ville} from "../model/ville";
import {InventoryMapInterface} from "../model/InventoryMap.interface";

export class InventaireSerializer implements Iserializer {

  fromJson(json: any): Inventaire {
    return {
      id: json.id,
      type: InventaireSerializer.setType(json),
      arbre: json.arbre ? InventoryConstService.factoryArbreAttribute(json.arbre) : null,
      epaysage: json.epaysage ? InventaireSerializer.serializeEpaysage(json.epaysage) : null,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      isFinished: json.isFinished,
      user: json.user,
      selected: false
    }
  }

  toJson(resource: Inventaire): any {
    if (!InventaireSerializer.isEB(resource.type)) {
      return {
        "diametre": resource.arbre.diametre,
        "hauteur": resource.arbre.hauteur,
        "type": resource.type,
        "isFinished": resource.isFinished,
        "coord": {
          "lat": resource.arbre.coord.lat,
          "long": resource.arbre.coord.long,
        },
        "espece": resource.arbre.espece.id,
        "numSujet": resource.arbre.numSujet,
        "codeSite": resource.arbre.codeSite,
        "risque": resource.arbre.risque,
        "imgUrl": {
          "img1": resource.arbre.imgUrl.img1,
          "img2": resource.arbre.imgUrl.img2,
          "img3": resource.arbre.imgUrl.img3
        }
      };
    } else {
      // ESSENCE
      return {
        "coord": MapService.createArrayInverse(resource.epaysage.coord),
        "type": resource.type,
        "isFinished": resource.isFinished,
        "essence": []
      }
    }
  }

  static serializeEpaysage(epaysage: Epaysage): Epaysage {
    // Epaysage
    if (epaysage.essence.length == 0) return epaysage;

    epaysage.essence.filter((elt: Essence) => {
      return InventoryConstService.factoryEssenceAttribute(elt);
    });
    return epaysage;
  }


  static arrayInventaireListoJson(datas: Inventaire[]): any[] {
    let data = [];
    for (const elt of datas) {
      if (elt.arbre) data.push(InventaireSerializer.serializeInventaire(elt));
      if (elt.epaysage) {
        elt.epaysage.essence.forEach((obj: Essence) => {
          data.push(InventaireSerializer.serializeInventaire(elt, obj));
        });
      }
    }
    return data;
  }

  static arrayMapJsonInventory(datas: Inventaire[]): InventoryMapInterface[] {
    return datas.map((elt: Inventaire) => InventaireSerializer.serializeMapIInventory(elt));
  }

  static serializeMapIInventory(data: Inventaire): InventoryMapInterface {
    return {
      id: data.id,
      type: data.type,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      isFinished: data.isFinished,
      address: !InventaireSerializer.isEB(data.type) ? data.arbre.address : data.epaysage.ville,
      ville: !InventaireSerializer.isEB(data.type) ? data.arbre.ville : data.epaysage.ville,

      arbre: !InventaireSerializer.isEB(data.type) && {
        id: data.arbre.id,
        hauteur: data.arbre.hauteur,
        diametre: data.arbre.diametre,
        name: data.arbre.espece.name,
        genre: data.arbre.espece.genre,
        cultivar: data.arbre.espece.cultivar,
        codeSite: data.arbre.codeSite,
        numSujet: data.arbre.numSujet,
        critere: data.arbre.critere,
        idEspece: data.arbre.espece.id,
        implantation: data.arbre.implantation
      },
      essences: InventaireSerializer.isEB(data.type) && data.epaysage.essence.map((essence: Essence) => {
        return {
          id: essence.id,
          name: essence.espece.name,
          genre: essence.espece.genre,
          cultivar: essence.espece.cultivar,
          codeSite: essence.codeSite,
          numSujet: essence.numSujet,
          diametre: essence.diametre,
          hauteur: essence.hauteur,
          countSubject: essence.countSubject,
          idEspece: essence.espece.id,
          critere: essence.critere
        }
      }),
      coord: data.type.toUpperCase() === 'ARBRE' ? data.arbre.coord : MapService.factoryCoordPolygon(data.epaysage.coord)
    }
  }

  static serializeInventaire(data: Inventaire, essence: Essence = null) {
    return {
      selected: false,
      id: data.id,
      type: InventaireSerializer.setType(data),
      idEssence: data.arbre ? null : essence.id,
      genre: data.arbre ? data.arbre.espece.genre : essence.espece.genre,
      espece: data.arbre ? data.arbre.espece.name : essence.espece.name,
      cultivar: data.arbre ? data.arbre.espece.cultivar : essence.espece.cultivar,
      countSubject: data.arbre ? 1 : essence.countSubject,
      diametre: data.arbre ? data.arbre.diametre : essence.diametre,
      hauteur: data.arbre ? data.arbre.hauteur : essence.hauteur,
      address: data.arbre ? data.arbre.address : data.epaysage.address,
      ville: data.arbre ? data.arbre.ville : data.epaysage.ville,
      codeSite: data.arbre ? data.arbre.codeSite : essence.codeSite,
      numSujet: data.arbre ? data.arbre.numSujet : essence.numSujet,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      statusTravaux: data.arbre ? data.arbre.statusTravaux : essence.statusTravaux,
      userEditedDateTravaux: data.arbre ? data.arbre.userEditedDateTravaux : essence.userEditedDateTravaux,
      coord: data.arbre ? data.arbre.coord : data.epaysage.coord,
      username: data.user.username
    }
  }

  public static setType(data: Inventaire): string {
    if (data.type.toUpperCase() !== 'ARBRE' && data.type.toUpperCase() !== 'ALIGNEMENT') {
      // Verify EPP, EBC && EB
      if (data.epaysage && data.epaysage.essence.length > 0) {
        let essence = data.epaysage.essence;
        if (essence[0].critereOther) {
          return 'EB'
        }
        return essence[0].critere.find((elt: string) => elt === 'espace-boise-classe') ? 'EBC' : 'EP'
      }
      return 'EB';
    }
    if (data.arbre && data.arbre.implantation === 'en-alignement') {
      return 'Alignement'
    }
    return 'Arbre'
  }

  public static formatCpVille(address: String): Ville {
    let data = address.trim().split(' ');
    let cp = data.shift();
    return {
      'cp': cp,
      'ville': data.toString().replace(',', ' ')
    }
  }

  static serializeTravauxListJson(data: Inventaire, essence: Essence = null) {
    return {
      selected: false,
      id: data.id,
      type: data.type,
      genre: data.arbre ? data.arbre.espece.genre : essence.espece.genre,
      espece: data.arbre ? data.arbre.espece.name : essence.espece.name,
      cultivar: data.arbre ? data.arbre.espece.cultivar : essence.espece.cultivar,
      workToRealize: '',
      idEssence: null,
      userEditedDateTravaux: data.arbre ? data.arbre.userEditedDateTravaux : essence.userEditedDateTravaux,
      countSubject: data.arbre ? 1 : essence.countSubject,
      hauteur: data.arbre ? data.arbre.hauteur : essence.hauteur,
      diametre: data.arbre ? data.arbre.diametre : essence.diametre,
      address: data.arbre ? data.arbre.address : essence.address,
      ville: data.arbre ? data.arbre.ville : essence.ville,
      codeSite: data.arbre ? data.arbre.codeSite : essence.codeSite,
      numSujet: data.arbre ? data.arbre.numSujet : essence.numSujet,
      beva: data.arbre ? data.arbre.beva : essence.beva,
      recenseur: data.user.username,
      username: data.user.username,
      abattage: data.arbre ? data.arbre.abattage : null,

      // Tree[arbre] key
      travauxColletMultiple: data.arbre ? data.arbre.travauxColletMultiple : null,
      travauxColletOther: data.arbre.travauxColletOther,
      travauxTroncMultiple: data.arbre.travauxTroncMultiple,
      travauxTroncOther: data.arbre.travauxTroncOther,
      travauxTroncProtection: data.arbre.travauxTroncProtection,
      travauxHouppierMultiple: data.arbre.travauxHouppierMultiple,
      travauxHouppierOther: data.arbre.travauxHouppierOther,
      dateProVisite: data.arbre.dateProVisite,
      dateTravaux: data.arbre.dateTravaux,
      statusTravaux: data.arbre.statusTravaux,
      risqueGeneralOther: data.arbre.risqueGeneralOther,
      etatSanGeneral: data.arbre.etatSanGeneral.filter((elt: string) => elt == ETAT_SAN_GENERAL_TAB.find((elt: DataConst) => elt.name == 'exam-comple').displayName)
    }
  }

  public static isEB(type: string): boolean {
    return (type.toUpperCase() !== 'ARBRE') && (type.toUpperCase() !== 'ALIGNEMENT');
  }
}
