import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Essence} from "../model/essence.interface";
import {InventoryConstService} from "../service/inventory-const.service";

export class EssenceSerializer implements Iserializer {
  fromJson(json: any): Essence {
    return InventoryConstService.factoryEssenceAttribute(json);
  }

  toJson(resource: any): any {
    return {
      espece: resource.espece,
      countSubject: resource.countSubject,
      numSujet: resource.numSujet,
      codeSite: resource.codeSite,
      hauteur: resource.hauteur,
      diametre: resource.diametre,
      epaysage: resource.epaysage
    }
  }

}
