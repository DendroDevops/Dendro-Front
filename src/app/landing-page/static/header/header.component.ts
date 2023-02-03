import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; // <-- do not forget to import
//import { Router } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router ) { }

  private fragment: string;

  ngOnInit() {
     this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(); }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }
}
