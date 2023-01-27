import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import * as bevaConst from "../../../admin/inventaires/shared/constant/beva.const";

@Component({
    selector: 'app-beva',
    templateUrl: './beva.component.html',
    styleUrls: ['./beva.component.scss']
})
export class BevaComponent implements OnInit {

    LOCATION_INDEX_TAB = bevaConst.LOCATION_INDEX_TAB;
    HEALTH_INDEX_TAB = bevaConst.HEALTH_INDEX_TAB;
    AESTHETIC_INDEX_TAB = bevaConst.AESTHETIC_INDEX_TAB;

    @Input() bevaGroup: FormGroup;

    constructor() {
    }

    ngOnInit() {
    }
}
