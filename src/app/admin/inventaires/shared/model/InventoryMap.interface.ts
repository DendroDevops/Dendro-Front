export class EssenceMapInterface {
  id: number;
  // espece
  idEspece: number;
  name: string;
  genre: string;
  cultivar: string;
  hauteur: Number;
  diametre: Number;
  critere?: String[];
  numSujet?: String;
  codeSite?: String;
  countSubject?: number;
}

export class InventoryMapInterface {
  id: number;
  type?: string;
  isFinished?: Boolean;
  // arbre
  arbre?: {
    id: number;
    // espece
    idEspece: number;
    name: string;
    genre: string;
    cultivar: string;
    hauteur: Number;
    diametre: Number;
    numSujet?: String;
    codeSite?: String;
    critere?: String[];
    implantation?: String;
  };
  address?: String;
  ville?: String;
  pays?: String;
  essences?: EssenceMapInterface []
  coord: any;
  createdAt?: Date;
  updatedAt?: Date;
  // arbre
}
