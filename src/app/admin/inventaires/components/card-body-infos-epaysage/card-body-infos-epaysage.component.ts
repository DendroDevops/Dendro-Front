import {Component, Input, OnInit} from '@angular/core';
import {Epaysage} from "../../shared/model/inventaire.interface";
import {environment} from "../../../../../environments/environment";
import {Essence} from "../../shared/model/essence.interface";

@Component({
  selector: 'app-card-body-infos-epaysage',
  templateUrl: './card-body-infos-epaysage.component.html',
  styleUrls: ['./card-body-infos-epaysage.component.scss']
})
export class CardBodyInfosEpaysageComponent implements OnInit {

  urlBaseEssence = environment.baseUrl + 'images/epaysage/essences/';
  current = new Date().getTime();
  @Input() epaysage: Epaysage
  @Input() idInventaire: number;

  @Input() typeInv: string;
  @Input() createdAt: Date;
  @Input() updatedAt: Date;
  @Input() isFinished: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  displayImage(essence: Essence): String {
    return essence.imageUrl.img1 && essence.imageUrl.img1;
  }

  isImgUrl(essence: Essence): boolean {
    return !!essence.imageUrl.img1;
  }
}
