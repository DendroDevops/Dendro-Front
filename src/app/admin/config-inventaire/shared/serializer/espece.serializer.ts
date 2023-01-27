import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Espece} from "../model/espece.interface";

export class EspeceSerializer implements Iserializer {

  fromJson(json: any): Espece {
    return {
      id: json.id,
      name: json.name,
      categorie: json.categorie,
      cultivar: json.cultivar,
      nomFr: json.nomFr,
      genre: json.genre,
      tarif: json.tarif,
      createdAt: json.createdAt,
      indiceEspece: json.indiceEspece
    };
  }

  toJson(resource: Espece): any {
    return {
      name: resource.name,
      categorie: resource.categorie,
      nomFr: resource.nomFr,
      cultivar: resource.cultivar,
      genre: resource.genre,
      tarif: resource.tarif
    };
  }

}
