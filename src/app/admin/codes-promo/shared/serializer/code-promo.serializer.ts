import { Iserializer } from "../../../../shared/serilaizer/iserializer";

export class CodePromoSerializer implements Iserializer {
  fromJson(json: any): any {
    return {
      id: json.id,
      code: json.code,
      utilisation: json.utilisation,
      dateActivation: json.dateActivation,
      statut: json.statut,
    };
  }

  toJson(resource: any): any {
    return {
      id: resource.id,
      code: resource.code,
      utilisation: resource.utilisation,
      dateActivation: resource.dateActivation,
      statut: resource.statut,
    };
  }
}
