import {UserModele} from '../../../gestion-droits/shared/model/user';
import {Resource} from "../../../../shared/modele/resource";
import {Arbre} from './arbre.interface';
import {Essence} from "./essence.interface";

export interface Inventaire extends Resource {
  selected?: Boolean;
  arbre?: Arbre;
  epaysage?: Epaysage;
  createdAt: Date;
  updatedAt?: Date;
  isFinished?: Boolean;
  type?: string;
  user: UserModele;
}

export interface Coordinate {
  lat: any;
  long: any;
}

export interface Epaysage {
  id: Number;
  essence: Essence[];
  coord: any[];
  address?: string;
  ville?: String;
  pays?: String;
  type?: string;
  area?: string;
}

export interface ImgInventaire {
  img1?: String;
  img2?: String;
  img3?: String;
}
