import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';
import {LayoutService} from '../layout.service';
import {AuthService} from '../../shared/service/auth.service';
import {ContactService} from '../../admin/contacts/shared/service/contactService.service';
import * as userConst from "../../admin/gestion-droits/shared/constant/user.constants";

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutSidenavComponent implements AfterViewInit {
  @Input() orientation = 'vertical';

  @HostBinding('class.layout-sidenav') private hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') private hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') private hostClassFlex = false;

  displayAdmin = false;
  displayDendro = false;
  displayAgile = false;

  groupe: string;
  totalMessageUnread: number;

  groupeTypes = userConst.USER_GROUPE_TYPE;


  constructor(private router: Router, public appService: AppService, private layoutService: LayoutService, private authService: AuthService, private contactService: ContactService) {
    // Set host classes
    this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;
    this.totalMessageUnread = 4;
    // this.messageUnread();
  }

  ngAfterViewInit() {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();
  }

  ngOnInit() {
    this.isAdmin();
    this.currentUser()
  }

  getClasses() {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuActive(url) {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  isAdmin() {
    // IS ADMIN
    this.displayAdmin = this.authService.isAdmin();
    this.displayDendro = this.authService.isDendro();
    this.displayAgile = this.authService.isAgile()
  }

  currentUser() {
    this.groupe = this.authService.decodeToken.data.groupe;
  }

  messageUnread() {
    this.contactService.list()
      .subscribe(data => {
        this.totalMessageUnread = data.length;
      }, () => {
      });
  }
}
