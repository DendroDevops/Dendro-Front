import {Resource} from "../../../../shared/modele/resource";
import {Forfait} from "./forfait.interface";

export interface GroupeModele extends Resource {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  groupeType: string;
  licence?: number;
  forfait?: Forfait;
  isStripped?: boolean;
  subId?: string;
  customerId?: string;
  dateEcheance?: Date;
  dateSubscribed?: Date;
  siret?: string;
  numCertification?: string;
  nameSociete?: string;
  cp?: string;
  ville?: string;
  addressSociete?: string;
  imgLogo?: string;
  codeForfait?: string;
  selected?: boolean
}
