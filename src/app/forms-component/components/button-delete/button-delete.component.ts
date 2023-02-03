import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../../../app.service";
import {AuthService} from "../../../shared/service/auth.service";
import {Inventaire} from "../../../admin/inventaires/shared/model/inventaire.interface";
import {CustomAlertService} from "../../../customAlertService.service";
import {InventaireService} from "../../../admin/inventaires/shared/service/inventaire.service";

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.scss']
})
export class ButtonDeleteComponent implements OnInit {

  @Input() data: any;
  @Output() deleteClick = new EventEmitter<boolean>();

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private customAlertService: CustomAlertService,
    private inventaireService: InventaireService
  ) {
  }

  ngOnInit() {
  }

  delete() {
    let inventaireSelected = this.data.filter((inv: Inventaire) => inv.selected).map(data => data.id);
    inventaireSelected = Array.from(new Set(inventaireSelected));

    if (inventaireSelected.length == 0) {
      this.customAlertService.toastAlert("Aucun element n'a été selectionné", 'toast-top-center', 'warning');
      return;
    }

    this.inventaireService.deleteInventaire(inventaireSelected)
      .subscribe(() => {
        this.customAlertService.toastAlert('Inventaire supprimé avec succès', 'toast-top-right', 'success');
        this.deleteClick.emit(true);
      }, () => {
        this.customAlertService.toastAlert("Aucun element n'a été selectionné", 'toast-top-center', 'error');
        this.deleteClick.emit(false);
      })
  }
}
