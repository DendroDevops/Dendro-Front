import {Component, Input, OnInit} from '@angular/core';
import {AppService} from "../../../../app.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/service/auth.service";
import {BackButtonUrlService} from "../../shared/service/backButtonUrl.service";

@Component({
  selector: 'app-button-show-page',
  templateUrl: './button-show-page.component.html',
  styleUrls: ['./button-show-page.component.scss']
})
export class ButtonShowPageComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean = false;

  @Input() urlRoutePage: string;
  @Input() isVisiteurConfig: boolean = false;

  constructor(private appService: AppService,
              private route: Router,
              public authService: AuthService,
              private urlService: BackButtonUrlService
  ) {
  }

  ngOnInit() {
  }

  backPage() {
    this.appService.goBack();
  }

  showPage() {
    if (this.backButton) {
      if (this.urlService.id) {
        this.route.navigate([`/admin/inventaires/${this.urlService.id}`]);
      } else {
        this.appService.goBack();
      }
    } else {
      this.route.navigate([`${this.urlRoutePage}`]);
    }
  }

  displayButtonVisitor(): boolean {
    if (this.isVisiteurConfig) {
      return !this.authService.isVisiteur();
    }
    return true;
  }
}
