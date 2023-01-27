import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {AuthService} from './shared/service/auth.service';
import {environment} from "../environments/environment";

@Injectable()
export class AppService {

  default_img = '../assets/static/img/user-default.png';
  messageDelete = {
    title: 'Etes-vous sûr(e) ?',
    subMessage: 'Vous êtes sur le point de supprimer un ou plusieurs inventaires'
  };

  messageDeleteImgArbre = {
    title: 'Etes-vous sûr(e) ?',
    subMessage: "Vous êtes sur le point de supprimer l'image de l'inventaire"
  };

  forfaitPerso = 'Agile_1MOIS';

  urlBase = environment.baseUrl;
  urlBaseArbreImg = environment.baseUrl + 'images/arbres/';
  urlBaseEssenceImg = environment.baseUrl + 'images/epaysage/essences/';
  urlBaseLogoImg = environment.baseUrl + 'images/logos/';
  urlLogo = '../assets/siteweb/Img/Logo/white.svg';
  urlLogo2 = '../assets/siteweb/Img/Logo/dark.svg';

  constructor(private titleService: Title, private location: Location, private authService: AuthService) {
  }

  goBack() {
    this.location.back();
  }

  getDisplayName(name: string, datas: any []) {

    return datas.filter(elt => elt.name == name).map(elt => elt.displayName);
  }

  // DISPLAYDENDRO
  get getGroupe() {
    return this.authService.decodeToken.data.groupe;
  }

  // DISPLAY MAIRIE
  // Set page title
  set pageTitle(value: string) {
    this.titleService.setTitle(`${value} | DENDROMAP`);
  }

  // Check for RTL layout
  get isRTL() {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
      document.body.getAttribute('dir') === 'rtl';
  }

  // Check if IE10
  get isIE10() {
    return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
  }

  // Layout navbar color
  get layoutNavbarBg() {
    return 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg() {
    return 'sidenav-theme';
  }


  // Layout footer color
  get layoutFooterBg() {
    return 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) {
      return;
    }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };


    const animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  }
}
