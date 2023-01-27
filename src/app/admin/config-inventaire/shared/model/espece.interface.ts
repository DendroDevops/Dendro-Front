import {Resource} from "../../../../shared/modele/resource";

export interface Espece extends Resource {
  name: string;
  imgUrl?: string;
  categorie?: string;
  cultivar?: string;
  nomFr?: string;
  genre?: string;
  tarif?: number;
  createdAt?: Date;
  indiceEspece?: number;
}
