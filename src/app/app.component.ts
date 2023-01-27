import {Component, OnInit} from '@angular/core';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import {AppService} from './app.service';
import {LayoutService} from './layout/layout.service';
import {filter} from "rxjs/operators";
import {PreviousUrlService} from "./@Dendromap/components/filter-table/service/previous-url.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host { display: block; }']
})
export class AppComponent implements OnInit {

  private currentUrl: string = 'null';
  private previousUrl: string = 'null'

  constructor(private router: Router,
              private appService: AppService,
              private layoutService: LayoutService,
              private urlService: PreviousUrlService) {
    // Subscribe to router events to handle components transition
    this.router.events.subscribe(this.navigationInterceptor.bind(this));

    // Disable animations and transitions in IE10 to increase performance
    if (typeof document['documentMode'] === 'number' && document['documentMode'] < 11) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
      document.head.appendChild(style);
    }
  }

  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
      // Set loading state
      document.body.classList.add('app-loading');
    }

    if (e instanceof NavigationEnd) {
      // Scroll to top of the components
      this.appService.scrollTop(0, 0);
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      // On small screens collapse sidenav
      if (this.layoutService.isSmallScreen() && !this.layoutService.isCollapsed()) {
        setTimeout(() => this.layoutService.setCollapsed(true, true), 10);
      }

      // Remove loading state
      document.body.classList.remove('app-loading');
    }
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setUrl(this.previousUrl);
    });
  }
}
