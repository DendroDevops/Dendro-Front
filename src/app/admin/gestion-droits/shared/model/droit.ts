import {Resource} from "../../../../shared/modele/resource";

export interface DroitModele extends Resource {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
