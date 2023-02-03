import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resource} from "../../../shared/modele/resource";
import {ResourceListInterface} from "../../../shared/modele/resourceList.interface";

@Component({
  selector: 'app-total-page',
  templateUrl: './total-page.component.html',
  styleUrls: ['./total-page.component.scss']
})
export class TotalPageComponent<T extends Resource> implements OnInit {

  @Input() dataList: ResourceListInterface<T>
  @Output() loadEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  changePage(event: number) {
    // next page when changing Data
    this.loadEvent.emit(event)
  }
}
