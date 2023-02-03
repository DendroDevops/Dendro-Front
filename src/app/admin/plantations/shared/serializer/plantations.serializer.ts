import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Plantation} from "../model/plantation.interface";
import * as moment from "moment";

export class PlantationsSerializer implements Iserializer {
  fromJson(json: any): Plantation {
    return {
      id: json.id,
      hauteur: json.hauteur,
      diametre: json.diametre,
      countSubject: json.countSubject,
      numSujet: json.numSujet,
      ville: json.ville,
      address: json.address,
      dateEcheance: json.dateEcheance,
      espece: json.espece,
      UserAdded: json.UserAdded,
      createdAt: json.createdAt,
      selected: false,
      inventory: json.inventory
    }
  }

  toJson(resource: Plantation): any {
    return {
      hauteur: resource.hauteur,
      diametre: resource.diametre,
      coord: resource.coord,
      espece: resource.espece,
      dateEcheance: resource.dateEcheance,
      countSubject: resource.countSubject
    }
  }

  static serializeToExtract(data: any[]): any[] | void {
    let tab = [];
    data = data.filter(inv => inv.selected);
    if (data.length === 0) return;

    return data.map((elt) => {
      return tab.push({
        Genre: elt.genre,
        Espece: elt.name,
        Cultivar: elt.cultivar,
        'Nombre de sujets': elt.countSubject,
        Hauteur: elt.hauteur,
        Diametre: elt.diametre,
        Adresse: elt.address,
        Ville: elt.ville,
        'date d\'Echéance': elt.dateEcheance ? moment(elt.dateEcheance).format('DD-MM-YYYY') : ''
      })
    });
  }

}
