import {UserModele} from "../../../gestion-droits/shared/model/user";
import {Espece} from "../../../config-inventaire/shared/model/espece.interface";
import {Coordinate} from "../../../inventaires/shared/model/inventaire.interface";
import {Resource} from "../../../../shared/modele/resource";

export interface Plantation extends Resource {
  hauteur: Number;
  diametre?: Number;
  countSubject: Number;
  numSujet: String;
  ville: String;
  address?: String;
  dateEcheance?: Date;
  espece: Espece;
  inventory?: number;
  UserAdded: UserModele;
  createdAt?: Date;
  selected?: boolean;
  coord?: Coordinate;
}
