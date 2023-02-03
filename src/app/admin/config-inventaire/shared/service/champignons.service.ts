import { Injectable } from '@angular/core';
import { ResourceService } from "../../../../shared/service/resource.service";
import { Champignons } from "../model/Champignons";
import { HttpClient } from "@angular/common/http";
import { ChampignonsSerializer } from "../serializer/champignons.serializer";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ChampignonsService extends ResourceService<Champignons> {

  constructor(private http: HttpClient, private champignonSerializer: ChampignonsSerializer) {
    super(
      http,
      'champignons',
      champignonSerializer
    )
  }

  addCustom(selectedFiles, name, attaqueF, attaqueR, category): Observable<Champignons> {
    const fd = new FormData();

    if (selectedFiles.length <= 0) {
      fd.append('img1', '')
      fd.append('img2', '')
    } else {
      let i = 0;
      selectedFiles.forEach(element => {
        i++;
        const selectedFile = element._file;
        fd.append('img' + i, selectedFile, selectedFile.name)
      });
    }
    fd.append('name', name);
    fd.append('attaqueF', attaqueF);
    fd.append('attaqueR', attaqueR);
    fd.append('category', category);

    return this.http.post<Champignons>(`${environment.baseUrl}${this.endpoint}`, fd)
  }
  uploadImage(id: number, selectedFile: {
    name: string;
    file: File;
  }): Observable<Champignons> {
    const fd = new FormData();
    fd.append(selectedFile.name, selectedFile.file);
    return this.http.post<Champignons>(`${environment.baseUrl}${this.endpoint}/${id}/upload`, fd)
  }
  deleteImage(id: number, img: string) {
    return this.http.post(`${environment.baseUrl}${this.endpoint}/${id}/delete-image`, { img }, { headers: environment.headers });
  }
}
