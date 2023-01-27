import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fallIn, moveInUp} from '../../../../router.animations';

@Component({
    selector: 'app-config-espece',
    templateUrl: './config-espece.component.html',
    styleUrls: [
        '../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss',
        './config-espece.component.scss',
        '../../../../../vendor/libs/spinkit/spinkit.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    animations: [moveInUp(), fallIn()]
})

export class ConfigEspeceComponent implements OnInit {

    list = true;
    visibleSpinner = false;
    state: any;

    constructor() {
    }

    ngOnInit() {
    }

}
