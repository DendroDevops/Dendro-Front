import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Forfait} from '../model/forfait.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../../../environments/environment";
import {FORFAIT_TYPE} from "../constant/user.constants";

const headers = new HttpHeaders().append('Content-Type', 'application/json');


@Injectable({
  providedIn: 'root'
})
export class ForfaitService {
  forfaitTypes: any [] = FORFAIT_TYPE;

  constructor(private http: HttpClient) {
  }

  getForfaits(): Observable<Forfait[]> {
    return this.http.get<Forfait[]>(`${environment.baseUrl}forfait`, {headers})
  }

  getDisplayNameForfait(codeForfait: String): string {
    if (codeForfait) {
      return this.forfaitTypes.find(res => res.name === codeForfait).displayName;
    }
    return null
  }

}
