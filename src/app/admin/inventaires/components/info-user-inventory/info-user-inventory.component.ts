import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-info-user-inventory',
  templateUrl: './info-user-inventory.component.html',
  styleUrls: ['./info-user-inventory.component.scss']
})
export class InfoUserInventoryComponent implements OnInit {

  imgFileNameUrl: string = '';
  urlBaseArbre = environment.baseUrl + 'images/arbres/';
  urlBaseEssence = environment.baseUrl + 'images/epaysage/essences/';
  current = new Date().getTime();

  @Input() data: any;
  @Input() createdAt: Date;
  @Input() updatedAt: Date;
  @Input() isFinished: boolean; // To show an inventory is finished or not
  @Input() idUrlPage: number;
  @Input() urlRoutePage: string;
  @Input() textLabelBtnShow: string;
  @Input() isVisiteurConfig: boolean = false;
  @Input() typeInventory: string;
  @Input() urlBackPage: string = '';

  constructor() {
  }

  ngOnInit() {
    this.displayImage();
  }

  displayImage(): void {
    if (!this.isEssence()) {
      this.imgFileNameUrl = this.data.imgUrl && this.urlBaseArbre + this.data.imgUrl.img1;
    } else if (this.isEssence()) {
      this.imgFileNameUrl = (this.data.imageUrl && this.data.imageUrl.img1) && this.urlBaseEssence + this.data.imageUrl.img1;
    }
  }

  isImgUrl(): boolean {
    return !this.isEssence() ?
      !!this.data.imgUrl.img1 : !!(this.data.imageUrl && this.data.imageUrl.img1);
  }

  isEssence(): boolean {
    return (this.typeInventory.toUpperCase() !== 'ARBRE') && (this.typeInventory.toUpperCase() !== 'ALIGNEMENT');
  }
}
