import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {
  }

  static currentUser() {
    return localStorage.getItem('token')
  }

  get decodeToken() {
    return AuthService.currentUser() ? helper.decodeToken(AuthService.currentUser()) : '';
  }

  isAdmin() {
    // IF ISADMIN
    const decode = this.decodeToken;
    return decode.data.isAdmin;
  }

  isVisiteur() {
    return this.decodeToken.data.role.toUpperCase() === 'LECTURE'
  }

  isDendro() {
    const decode = this.decodeToken;
    return decode.data.groupe === 'DENDROMAP';
  }

  isAgile() {
    const decode = this.decodeToken;
    return decode.data.forfait !== 'Flex';
  }

  isAgent() {
    return this.decodeToken.data.role.toUpperCase() == 'LECTURE/ECRITURE'
  }

  isRoleDeleted(): boolean {
    return !this.isAgent() && !this.isVisiteur();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  resetPassword(id, password, confirmPassword) {
    return this.http.put(`${environment.baseUrl}auth/${id}/resetPassword`, {
      new: password,
      confirm: confirmPassword,
      id: id
    }, {headers: environment.headers})
  }

  confirmEmail(token: string) {
    return this.http.post(`${environment.baseUrl}auth/confirm`, {
      token: token
    }, {headers: environment.headers})
  }

  // SEND EMAIL FOR CHANGE PASSWORD
  sendEmailResetPassword(email: string) {
    return this.http.post(`${environment.baseUrl}auth/mailPassword`, {email: email}, {headers: environment.headers})
  }

  verifyToken(token: string) {
    return this.http.post(`${environment.baseUrl}auth/verifyToken`, {token: token}, {headers: environment.headers})
  }

  login(email: string, password: string) {
    // LOGIN ET PASSWORD
    return this.http.post(`${environment.baseUrl}auth/login`,
      {
        email: email,
        password: password
      },
      {headers: environment.headers});
  }

  signUp(obj: any) {
    // LOGIN ET PASSWORD
    return this.http.post(`${environment.baseUrl}auth/signup`,
      {
        email: obj.email,
        password: obj.password,
        username: obj.username,
        forfait: obj.forfait,
        name: obj.name,
        phoneNumber: obj.phoneNumber,
        city: obj.city,
        zipCode: obj.zipCode,
        address: obj.address,
        address2: obj.address2,
        ccNumber: obj.ccNumber,
        nameCard: obj.nameCard,
        ccCvc: obj.ccCvc,
        ccExp: obj.ccExp,
        discount: obj.discount
      },
      {headers: environment.headers});
  }
}
