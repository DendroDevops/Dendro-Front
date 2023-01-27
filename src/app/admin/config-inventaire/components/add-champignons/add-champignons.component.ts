import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChampignonsService} from "../../shared/service/champignons.service";
import {FileUploader} from "ng2-file-upload";
import {CustomAlertService} from "../../../../customAlertService.service";
import {ControlService} from "../../../../shared/service/control.service";

const URL = 'http://127.0.0.1:8000/champignons/upload';

@Component({
  selector: 'app-add-champignons',
  templateUrl: './add-champignons.component.html',
  styleUrls: [
    './add-champignons.component.scss',
    '../../../../../vendor/libs/ngx-dropzone-wrapper/ngx-dropzone-wrapper.scss'
  ]
})
export class AddChampignonsComponent implements OnInit {
  // ATTRIBUTE
  name: string;
  showErrorName = false;
  errorName: String = '';

  attaqueF = '';
  attaqueR = '';
  category: string = '';

  selectedFile: any;

  @Output() list: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() visibleSpinner: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private champignonsService: ChampignonsService,
              private customAlertService: CustomAlertService,
              private controlService: ControlService) {
  }

  uploader = new FileUploader({
    url: URL,
    authTokenHeader: 'authorization',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    queueLimit: 3,
    disableMultipart: true,
  });
  hasBaseDropZoneOver = false;

  fileOver(e: any) {
    const file: File = e.target.files[0];
    // const file: File = e[0].target;
    this.hasBaseDropZoneOver = e;
    this.selectedFile = e;
  }

  ngOnInit() {
  }

  onFileSelected($event) {
    const file: File = $event.target.files[0];
    this.selectedFile = file;
  }

  onAdd() {
    this.visibleSpinner.emit(true);

    this.selectedFile = this.uploader.queue;
    if (!this.onControlName()) {
      this.champignonsService.addCustom(this.selectedFile, this.name, this.attaqueF, this.attaqueR, this.category)
        .subscribe(() => {
          this.visibleSpinner.emit(false);
          this.customAlertService.toastAlert('Enrégistrement réussi', 'toast-top-right', 'success');
          this.list.emit(true);
        }, err => {
          this.visibleSpinner.emit(false);
          this.customAlertService.toastAlert(err, 'toast-top-right', 'error');
        });
    } else {
      this.visibleSpinner.emit(false);
    }
  }

  onControlName() {
    let error = false;
    if (this.controlService.isEmpty(this.name)) {
      this.showErrorName = true;
      this.errorName = 'Champs obligatoire';
      error = true;

    } else {
      this.showErrorName = false;
      this.errorName = '';
      error = false;
    }
    return error;
  }

}
