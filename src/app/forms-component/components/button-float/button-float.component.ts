import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button-float',
  templateUrl: './button-float.component.html',
  styleUrls: ['./button-float.component.scss']
})
export class ButtonFloatComponent implements OnInit {

  @Input() list: boolean = true;
  @Output() clickBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  displayList() {
    this.list = !this.list;
    this.clickBtn.emit(this.list);
  }
}
