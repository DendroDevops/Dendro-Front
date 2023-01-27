import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../../../environments/environment';
import {Essence} from "../model/essence.interface";
import {ResourceService} from "../../../../shared/service/resource.service";
import {EssenceSerializer} from "../serializer/essence.serializer";
import {Observable} from "rxjs";

@Injectable()

export class EssenceService extends ResourceService<Essence> {

  constructor(
    private http: HttpClient,
    private essenceSerializer: EssenceSerializer) {
    super(
      http,
      'essence',
      essenceSerializer
    )
  }

  getOneEssence(id: number): Observable<Essence> {
    return this.http.get<Essence>(`${environment.baseUrl}${this.endpoint}/${id}`, {headers: environment.headers});
  }

  // update(essence: Essence) {
  //   return this.http.put(`${environment.baseUrl}${this.endpoint}/${essence.id}`, essence, {headers: environment.headers})
  // }

  addImgEssence(selectedFiles, id, position = null) {
    let fd = new FormData();
    let i = 0;
    if (position) {
      fd.append('img' + position, selectedFiles[0]._file, selectedFiles[0]._file.name)
    } else {
      selectedFiles.forEach(element => {
        i++;
        const selectedFile = element._file;
        fd.append('img' + i, selectedFile, selectedFile.name)
      });
    }

    return this.http.post(`${environment.baseUrl}epaysage/${id}/upload`, fd)
  }

  deleteImgEssence(position, idEssence) {
    return this.http.put(`${environment.baseUrl}${this.endpoint}/${idEssence}/deleteImg`, {
      numImg: position
    }, {headers: environment.headers})
  }
}
