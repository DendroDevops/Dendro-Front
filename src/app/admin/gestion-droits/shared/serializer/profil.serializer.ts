import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {ProfilModele} from "../model/profil";

export class ProfilSerializer implements Iserializer {
  fromJson(json: any): ProfilModele {
    return {
      id: json.id,
      name: json.name,
      groupeType: json.groupeType,
      droit: json.droit,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    };
  }

  toJson(resource: ProfilModele): any {
    return {
      name: resource.name,
      droit: resource.droit,
      groupeType: resource.groupeType
    }
  }

}
