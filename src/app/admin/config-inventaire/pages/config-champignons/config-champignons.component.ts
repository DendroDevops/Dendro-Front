import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fallIn, moveInUp} from '../../../../router.animations';

@Component({
  selector: 'app-config-champignons',
  templateUrl: './config-champignons.component.html',
  styleUrls: ['./config-champignons.component.scss',
    '../../../../../vendor/libs/spinkit/spinkit.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [moveInUp(), fallIn()]
})

export class ConfigChampignonsComponent implements OnInit {
  state: any;

  list = true;
  visibleSpinner = false;

  constructor() {
  }

  ngOnInit() {
  }


  afterAdd(event) {
    this.list = event;
  }

}
