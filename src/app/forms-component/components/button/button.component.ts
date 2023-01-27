import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() textLabel: string;
  @Input() formGroup: FormGroup;
  @Input() type: string;
  @Input() classButton: string;

  constructor() {
  }

  ngOnInit() {
  }

}
