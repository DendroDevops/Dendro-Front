import {Injectable} from "@angular/core";

export const ROUTE_FILTER_TAB = [
  '/admin/gestion-travaux/travaux',
  '/admin/gestion-travaux/alerte',
  '/admin/gestion-travaux/examen',
  '/admin/inventaires',
  '/admin/saisie-valide'
]

@Injectable()

export class PreviousUrlService {

  constructor() {
  }

  setUrl(data: string) {
    sessionStorage.setItem('previousUrl', data);
  }

  getUrl() {
    return sessionStorage.getItem('previousUrl');
  }

  removeUrl() {
    return sessionStorage.removeItem('previousUrl');
  }

  static existFilterRoute(url: string): boolean {
    return !url && ROUTE_FILTER_TAB.includes(url);
  }

  static isPreviousDetailUrl(url: string): boolean {
    if (!url) return false;
    let data = url.split('/').filter(elt => elt !== '');
    return data[0] && data[1] && !isNaN(parseInt(data[2]));
  }
}
