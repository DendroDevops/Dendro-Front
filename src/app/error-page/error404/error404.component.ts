import {Component, OnInit} from '@angular/core';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(public appService: AppService) {
  }

  ngOnInit() {
  }

}
