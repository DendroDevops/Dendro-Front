import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-date-input-form',
  templateUrl: './date-input-form.component.html',
  styleUrls: ['./date-input-form.component.scss']
})
export class DateInputFormComponent implements OnInit {

  @Input() dateEcheanceForm: FormGroup;
  @Input() textLabel: string = '';
  @Input() formName: string;
  @Input() placement: string;

  displayMonths = 1;
  disabled = false;

  constructor() {
  }

  ngOnInit() {
  }

}
