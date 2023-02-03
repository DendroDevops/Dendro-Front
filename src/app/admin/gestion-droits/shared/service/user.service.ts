import {Injectable} from '@angular/core';
import {ResourceService} from "../../../../shared/service/resource.service";
import {UserModele} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {UserSerializer} from "../serializer/user.serializer";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()

export class UserService extends ResourceService<UserModele> {

  constructor(
    private http: HttpClient,
    private userSerializer: UserSerializer) {
    super(
      http,
      'user',
      userSerializer
    );
  }

  activeOrDesactive(user: UserModele) {
    return this.http.put(`${environment.baseUrl}${this.endpoint}/${user.id}/active`, {headers: environment.headers})
  }

  updateProfilUser(userId: number, profilId: number) {
    // update a profil user with id
    return this.http.put(`${environment.baseUrl}${this.endpoint}/${userId}/profilUser`, {
      profilName: profilId
    }, {headers: environment.headers});
  }

  updateCurrencyModeWithSrippe(obj: any, id: number) {
    return this.http.patch(`${environment.baseUrl}${this.endpoint}/${id}/changeForfait`, {
      name: obj.name,
      forfait: obj.forfait,
      phoneNumber: obj.phoneNumber,
      city: obj.city,
      zipCode: obj.zipCode,
      address: obj.address,
      address2: obj.address2,
      ccNumber: obj.ccNumber,
      nameCard: obj.nameCard,
      ccCvc: obj.ccCvc,
      ccExp: obj.ccExp,
      changingMode: obj.changingMode
    }, {headers: environment.headers})
  }

  updateUserProfil(obj, id) {
    // modif infos user
    return this.http.put(`${environment.baseUrl}${this.endpoint}/${id}/modifCompte`, {
      nom: obj.nom,
      prenom: obj.prenom,
      email: obj.email,
      groupe: obj.groupe,
      numCertification: obj.numCertification,
      cp: obj.cp,
      ville: obj.ville,
      siret: obj.siret,
      addressSociete: obj.addressSociete,
      nameSociete: obj.nameSociete
    }, {headers: environment.headers})
  }

  unsubscribe(id: number) {
    return this.http.patch(`${environment.baseUrl}${this.endpoint}/${id}/unsubscribe`, {}, {headers: environment.headers})
  }

  uploadImage(id, selectedFile, username) {
    const fd = new FormData();
    if (!selectedFile) {
      fd.append('img', selectedFile)
      fd.append('username', username)
    } else {
      fd.append('img', selectedFile, selectedFile.name);
      fd.append('username', username)
    }

    return this.http.post(`${environment.baseUrl}${this.endpoint}/${id}/upload`, fd);
  }

  sendMailConfirmEmail(id) {
    // TO CONFIRM A PASSWORD
    return this.http.get(`${environment.baseUrl}${this.endpoint}/${id}/mailconfirm`, {headers: environment.headers});
  }

  reinitilaisePassword(id: number) {
    return this.http.get(`${environment.baseUrl}${this.endpoint}/${id}/resetpassword`, {headers: environment.headers})
  }

  updateUser(obj: UserModele): Observable<any> {
    return this.http.patch(`${environment.baseUrl}user/${obj.id}`, {
      username: obj.username,
      profil: obj.profil,
      email: obj.email
    }, {headers: environment.headers})
  }
}
