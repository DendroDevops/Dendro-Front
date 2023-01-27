import {ProfilModele} from './profil';
import {GroupeModele} from './groupe';
import {Resource} from "../../../../shared/modele/resource";

export interface UserModele extends Resource {
    nom?: string;
    prenom?: string;
    email: string;
    password?: string;
    username: string;
    img?: string;
    profil?: ProfilModele;
    groupe?: GroupeModele;
    createdAt: any;
    updatedAt?: any;
    emailActive: boolean;
    isActive?: boolean;
}
