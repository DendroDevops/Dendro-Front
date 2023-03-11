import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detail-work',
  templateUrl: './detail-work.component.html',
  styleUrls: ['./detail-work.component.scss']
})

export class DetailWorkComponent implements OnInit {

  @Input() data: any;
  @Input() title: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    console.log("data")
  }

  isTree(type: string): boolean {
    return (type.toUpperCase() === 'ARBRE') || (type.toUpperCase() === 'ALIGNEMENT');
  }

}
