import {Component, Input, OnInit} from '@angular/core';
import {ExcelService} from '../../../admin/gestion-travaux/shared/service/excel.service';
import {InventaireService} from '../../../admin/inventaires/shared/service/inventaire.service';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.scss']
})
export class ExportButtonComponent implements OnInit {

  @Input() dataSelected: any;
  @Input() titleFile: string;
  @Input() typeData: string = 'TRAVAUX' || 'INVENTORY';

  constructor(private excelService: ExcelService) {
  }

  ngOnInit() {
  }

  exportAsXLSX(): void {
    // extract data
    let data = this.dataSelected.filter(elt => elt.selected);
    if (data.length === 0) return;
    this.excelService.exportAsExcelFile(this.typeData == 'TRAVAUX' ? InventaireService.extractFileTravauxJson(data) : InventaireService.extractFileJson(data),
      this.titleFile
    );
  }

  isDesabledButton(): boolean {
    return this.dataSelected.filter(elt => elt.selected).length > 0;
  }
}
