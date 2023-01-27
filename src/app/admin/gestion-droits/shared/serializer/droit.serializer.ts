import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {DroitModele} from "../model/droit";

export class DroitSerializer implements Iserializer {
  fromJson(json: any): DroitModele {
    return {
      id: json.id,
      name: json.name,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    }
  }

  toJson(resource: DroitModele): any {
    return {
      name: resource.name
    };
  }

}
