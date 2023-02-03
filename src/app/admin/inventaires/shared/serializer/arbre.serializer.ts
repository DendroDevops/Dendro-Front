import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {Arbre} from "../model/arbre.interface";
import {InventoryConstService} from "../service/inventory-const.service";

export class ArbreSerializer implements Iserializer {

  fromJson(json: any): Arbre {
    return InventoryConstService.factoryArbreAttribute(json);
  }

  toJson(resource: Arbre): any {
    return {
      hauteur: resource.hauteur,
      diametre: resource.diametre,
      coord: resource.coord,
      espece: resource.espece
    }
  }

}
