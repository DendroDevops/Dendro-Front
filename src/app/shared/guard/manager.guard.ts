import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class ManagerGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.decodeToken) {
      return this.authService.isAgile();
    }
    // not logged in so redirect to login components with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
