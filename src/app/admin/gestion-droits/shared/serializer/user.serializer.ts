import {Iserializer} from "../../../../shared/serilaizer/iserializer";
import {UserModele} from "../model/user";

export class UserSerializer implements Iserializer {

  fromJson(json: any): UserModele {
    return {
      id: json.id,
      nom: json.nom,
      prenom: json.prenom,
      email: json.email,
      username: json.username,
      img: json.img,
      profil: json.profil,
      groupe: json.groupe,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      emailActive: json.emailActive,
      isActive: json.isActive
    }
  }

  toJson(user: UserModele): any {
    return {
      username: user.username,
      email: user.email,
      password: user.password,
      profil: user.profil,
      groupe: user.groupe,
      name: user.username
    }
  }

}
