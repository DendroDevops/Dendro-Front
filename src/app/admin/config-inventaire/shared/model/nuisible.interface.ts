import {Resource} from "../../../../shared/modele/resource";

export interface Nuisible extends Resource {
  name: string;
  createdAt?: Date;
  updatedAt?: Date
}
