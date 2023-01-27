import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {LayoutService} from '../../layout/layout.service';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {UserService} from "../../admin/gestion-droits/shared/service/user.service";

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = true;
  isRTL: boolean;
  // currentUser
  user: any = {}

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;


  constructor(
    public appService: AppService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.isRTL = appService.isRTL;
  }

  ngOnInit() {
    this.currentUser();
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }


  currentUser() {
    const userToken = this.authService.decodeToken
    this.userService.read(userToken.data.id)
      .subscribe((response: any) => {
        this.user = response;
      }, err => {
        console.log(err);
      })
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
