import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Nuisible} from "../model/nuisible.interface";

export class NuisibleSerializer implements Iserializer {

  fromJson(json: any): Nuisible {
    return {
      id: json.id,
      name: json.name,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt
    };
  }

  toJson(resource: Nuisible): any {
    return {
      name: resource.name
    };
  }

}
