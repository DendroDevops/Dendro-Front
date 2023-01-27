import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Champignons} from "../model/Champignons";

export class ChampignonsSerializer implements Iserializer {
  fromJson(json: any): Champignons {
    return {
      id: json.id,
      name: json.name,
      attaqueF: json.attaqueF,
      attaqueR: json.attaqueR,
      category: json.category,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      imgUrl: json.imgUrl
    }
  }

  toJson(resource: Champignons): any {
    return {
      name: resource.name,
      categry: resource.category,
      attaqueF: resource.attaqueF,
      attaqueR: resource.attaqueR,
      category: resource.category,
      imgUrl: resource.imgUrl
    }
  }

}
