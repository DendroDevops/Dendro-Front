import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../../../../environments/environment';
import {ContactModele} from '../model/contact';
import {tap} from 'rxjs/operators';


const headers = new HttpHeaders().append('Content-Type', 'application/json');

@Injectable()

export class ContactService {

  constructor(private http: HttpClient) {
  }

  add(nom, prenom, tel, email, fonction, groupe, objet, message) {
    return this.http.post(`${environment.baseUrl}contact`, {
      nom: nom,
      prenom: prenom,
      tel: tel,
      email: email,
      groupe: groupe,
      fonction: fonction,
      objet: objet,
      message: message
    }, {headers});
  }

  list() {
    return this.http.get<ContactModele[]>(`${environment.baseUrl}contact`, {headers})
  }

  getOne(id) {

    if (!isNaN(id)) {
      return this.http.get<ContactModele>(`${environment.baseUrl}contact/${id}`, {headers})
        .pipe(
          tap(_ => console.log('fetched'))
        );
    }
  }

  delete(id) {
    if (!isNaN(id)) {
      return this.http.delete(`${environment.baseUrl}contact/${id}`, {headers});
    }
  }
}
