import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../../environments/environment';
import {GroupeModele} from '../model/groupe';
import * as moment from "moment";
import {ResourceService} from "../../../../shared/service/resource.service";
import {GroupeSerializer} from "../serializer/groupe.serializer";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const now = moment(moment().format());

@Injectable()

export class GroupeService extends ResourceService<GroupeModele> {

  constructor(
    private http: HttpClient,
    private groupSerializer: GroupeSerializer
  ) {
    super(http,
      'groupe',
      groupSerializer)
  }

  // User ready to be changed Forfait
  public readyChangeForfait(groupe: GroupeModele): number {
    if (!groupe.dateEcheance && !groupe.isStripped) {
      return 12;
    }
    return moment(groupe.dateEcheance).diff(now, 'months', false);
  }

  uploadImg(idGroupe, selectedFile) {
    const fd = new FormData();
    const name = `${Math.random().toString(36).slice(-5)}.png`
    fd.append('img', selectedFile, name);

    return this.http.post(`${environment.baseUrl}${this.endpoint}/${idGroupe}/upload`, fd)
  }

  getAllNoStripped(): Observable<GroupeModele[]> {
    return this.http.get<GroupeModele[]>(`${environment.baseUrl}${this.endpoint}/getNoStripped`, {headers: environment.headers})
      .pipe(map((data: GroupeModele[]) => this.convertData(data)))
  }

  changeModeGroupStripped(data: number[]) {
    return this.http.patch(`${environment.baseUrl}${this.endpoint}/changeModeStripped`, {
      ids: data
    }, {headers: environment.headers})
  }
}
