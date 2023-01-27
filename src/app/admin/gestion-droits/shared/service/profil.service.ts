import {Injectable} from '@angular/core';
import {ProfilModele} from "../model/profil";
import {ResourceService} from "../../../../shared/service/resource.service";
import {HttpClient} from "@angular/common/http";
import {ProfilSerializer} from "../serializer/profil.serializer";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ProfilService extends ResourceService<ProfilModele> {

  constructor(private http: HttpClient, private profilSerializer: ProfilSerializer) {
    super(
      http,
      'profil',
      profilSerializer
    )
  }

  allProfilGroupe(groupId: number): Observable<ProfilModele[]> {
    return this.http.post<ProfilModele[]>(`${environment.baseUrl}${this.endpoint}/profilGroupe`, {id: groupId}, {headers: environment.headers});
  }
}
