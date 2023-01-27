import {DroitModele} from './droit';
import {Resource} from "../../../../shared/modele/resource";

export interface ProfilModele extends Resource {
  name: string;
  groupeType: string;
  droit: DroitModele;
  createdAt?: Date;
  updatedAt?: Date;
}
