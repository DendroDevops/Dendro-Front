import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {GroupeModele} from "../model/groupe";

export class GroupeSerializer implements Iserializer {
  // back from server
  fromJson(json: any): GroupeModele {
    return {
      id: json.id,
      name: json.name,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      groupeType: json.groupeType,
      licence: json.licence,
      forfait: json.forfait,
      isStripped: json.isStripped,
      subId: json.subId,
      customerId: json.customerId,
      dateEcheance: json.dateEcheance,
      dateSubscribed: json.dateSubscribed,
      siret: json.siret,
      numCertification: json.numCertification,
      cp: json.cp,
      ville: json.ville,
      imgLogo: json.imgLogo,
      addressSociete: json.addressSociete,
      nameSociete: json.nameSociete,
      selected: false
    }
  }

  // send to server
  toJson(resource: GroupeModele): any {
    return {
      name: resource.name,
      groupeType: resource.groupeType,
      licence: resource.licence,
      forfait: resource.forfait
    }
  };

}
