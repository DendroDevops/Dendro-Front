import {Component, Input, OnInit} from '@angular/core';
import {InventoryMapInterface} from "../../shared/model/InventoryMap.interface";
import {Router} from "@angular/router";
import {InventaireSerializer} from "../../shared/serializer/inventaire.serializer";

@Component({
  selector: 'app-marker-tree',
  templateUrl: './marker-tree.component.html',
  styleUrls: ['./marker-tree.component.scss']
})
export class MarkerTreeComponent implements OnInit {

  @Input() inventory: InventoryMapInterface;

  iconBrouillon = '../../../assets/static/img/Draft.svg';
  iconTermine = '../../../assets/static/img/Original.svg';
  iconEnAlignement = '../../../assets/static/img/EnAlignement.svg';

  constructor(private router: Router, public inventaireSerializer: InventaireSerializer) {
  }

  ngOnInit() {
  }

  show(id: number): void {
    this.router.navigate([`/admin/inventaires/${id}`]);
  }

  /**
   * @return boolean
   * @param type
   */
  isEssence(type: string): boolean {
    return InventaireSerializer.isEB(type);
  }
}
