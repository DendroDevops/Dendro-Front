import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Espece} from "../../../admin/config-inventaire/shared/model/espece.interface";
import {EspeceService} from "../../../admin/config-inventaire/shared/service/espece.service";
import {IOption} from "ng-select";

@Component({
  selector: 'app-espece-form',
  templateUrl: './espece-form.component.html',
  styleUrls: [
    './espece-form.component.scss',
    '../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class EspeceFormComponent implements OnInit {

  @Input() especeGroup: FormGroup;
  @Input() errorText: string;
  @Output() selectEvent = new EventEmitter<Espece>();

  especesDatas: Espece[] = [];
  disabled = false
  selectOptions: Array<IOption> = [];

  constructor(private especeService: EspeceService) {
  }

  ngOnInit() {
    this.getEspeces();
  }

  getEspeces() {
    this.especeService.list().toPromise()
      .then((data: Espece[]) => {
        this.especesDatas = data;
        data.map((espece: Espece) => {
            const cultivar = espece.cultivar === null ? '' : espece.cultivar;
            this.selectOptions = [
              ...this.selectOptions,
              {
                label: espece.genre + ' ' + espece.name + ' ' + cultivar,
                value: espece.id.toString()
              }]
          }
        )
      });
  }

  isValueChange() {
    if (!this.especeGroup.get('espece').value) return;
    const espece = this.especesDatas.find((elt) => elt.id = this.especeGroup.get('espece').value)
    this.selectEvent.emit(espece);
  }
}
