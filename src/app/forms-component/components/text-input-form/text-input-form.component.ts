import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-text-input-form',
    templateUrl: './text-input-form.component.html',
    styleUrls: ['./text-input-form.component.scss']
})

export class TextInputFormComponent implements OnInit {

    @Input() textFormGroup: FormGroup;
    @Input() textLabel: string;
    @Input() formName: string;
    @Input() required: boolean = false;
    @Input() errorText: string;
    @Input() type: string = 'text';
    @Input() placeholder: string = 'Saisir une donnée';

    constructor() {
    }

    ngOnInit() {
    }

}
