import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-select-input-form',
  templateUrl: './select-input-form.component.html',
  styleUrls: [
    './select-input-form.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class SelectInputFormComponent implements OnInit {

  @Input() selectFormGroup: FormGroup;
  @Input() textLabel: string;
  @Input() formName: string;
  @Input() isMultiple: Boolean = false;
  @Input() DATA_TAB: any[] = [];

  @Output() selectEvent = new EventEmitter<string[] | string>();
  disabled: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  isValueChange() {
    this.selectEvent.emit(this.selectFormGroup.get(this.formName).value);
  }
}
