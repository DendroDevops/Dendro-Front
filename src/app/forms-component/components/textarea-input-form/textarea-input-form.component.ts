import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-textarea-input-form',
  templateUrl: './textarea-input-form.component.html',
  styleUrls: ['./textarea-input-form.component.scss']
})
export class TextareaInputFormComponent implements OnInit {

  @Input() textLabel: string;
  @Input() formName: string;
  @Input() textareaGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }


}
